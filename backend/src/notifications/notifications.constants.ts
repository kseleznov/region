/**
 * Known notification kinds. Kept as a string union (not a Prisma enum) so
 * adding a kind is a data change, not a migration.
 */
export const NOTIFICATION_TYPES = ['follow'] as const;

export type NotificationType = (typeof NOTIFICATION_TYPES)[number];

/** How many notifications the feed endpoint returns, newest first. */
export const NOTIFICATION_FEED_LIMIT = 50;
