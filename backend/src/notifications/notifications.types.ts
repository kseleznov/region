import type { NotificationType } from './notifications.constants';

/** Shape returned by the feed endpoint — one entry per event. */
export interface NotificationView {
  id: number;
  type: NotificationType;
  read: boolean;
  createdAt: Date;
  /** Author of the event; `null` only for future system notifications. */
  actor: { username: string; name: string } | null;
}

/** Input the other modules pass to `NotificationsService.create`. */
export interface CreateNotificationInput {
  recipientId: number;
  actorId: number;
  type: NotificationType;
}
