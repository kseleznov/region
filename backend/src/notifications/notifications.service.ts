import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NOTIFICATION_FEED_LIMIT } from './notifications.constants';
import type {
  CreateNotificationInput,
  NotificationView,
} from './notifications.types';

const notificationSelect = {
  id: true,
  type: true,
  read: true,
  createdAt: true,
  actor: { select: { username: true, name: true } },
} as const;

type NotificationRow = {
  id: number;
  type: string;
  read: boolean;
  createdAt: Date;
  actor: { username: string; name: string } | null;
};

function toView(row: NotificationRow): NotificationView {
  return {
    id: row.id,
    type: row.type as NotificationView['type'],
    read: row.read,
    createdAt: row.createdAt,
    actor: row.actor,
  };
}

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  /** The recipient's feed, newest first, capped at {@link NOTIFICATION_FEED_LIMIT}. */
  async list(userId: number): Promise<NotificationView[]> {
    const rows = (await this.prisma.notification.findMany({
      where: { recipientId: userId },
      orderBy: { createdAt: 'desc' },
      take: NOTIFICATION_FEED_LIMIT,
      select: notificationSelect,
    })) as NotificationRow[];

    return rows.map(toView);
  }

  async unreadCount(userId: number): Promise<{ count: number }> {
    const count = await this.prisma.notification.count({
      where: { recipientId: userId, read: false },
    });
    return { count };
  }

  async markAllRead(userId: number): Promise<{ count: number }> {
    await this.prisma.notification.updateMany({
      where: { recipientId: userId, read: false },
      data: { read: true },
    });
    return { count: 0 };
  }

  async markRead(
    userId: number,
    notificationId: number,
  ): Promise<{ id: number; read: true }> {
    const { count } = await this.prisma.notification.updateMany({
      where: { id: notificationId, recipientId: userId },
      data: { read: true },
    });
    if (count === 0) {
      throw new NotFoundException(
        `Notification with id ${notificationId} not found`,
      );
    }
    return { id: notificationId, read: true };
  }

  /**
   * Record an event for the recipient. A no-op when the actor is the recipient,
   * or when an identical unread notification already sits at the top of the
   * feed (re-follow after an unfollow shouldn't stack duplicates).
   */
  async create(input: CreateNotificationInput): Promise<void> {
    if (input.recipientId === input.actorId) {
      return;
    }

    const duplicate = await this.prisma.notification.findFirst({
      where: {
        recipientId: input.recipientId,
        actorId: input.actorId,
        type: input.type,
        read: false,
      },
      select: { id: true },
    });
    if (duplicate) {
      return;
    }

    await this.prisma.notification.create({
      data: {
        recipientId: input.recipientId,
        actorId: input.actorId,
        type: input.type,
      },
    });
  }
}
