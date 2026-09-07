/** Event kinds the feed can render. String union, extensible server-side. */
export type NotificationType = "follow";

export interface NotificationActor {
  username: string;
  name: string;
}

/**
 * One entry in the activity feed. Named `AppNotification` to avoid colliding
 * with the DOM `Notification` global.
 */
export interface AppNotification {
  id: number;
  type: NotificationType;
  read: boolean;
  createdAt: string;
  /** `null` only for future system-generated notifications. */
  actor: NotificationActor | null;
}

export interface UnreadCount {
  count: number;
}
