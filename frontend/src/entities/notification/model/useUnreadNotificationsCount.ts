import { useQuery } from "@tanstack/react-query";
import { notificationApi } from "../api/notificationApi";

export const unreadNotificationsCountKey = [
  "notifications",
  "unread-count",
] as const;

interface UseUnreadNotificationsCountOptions {
  /** Gate the request on an authenticated session — the feed needs a user. */
  enabled?: boolean;
}

export function useUnreadNotificationsCount({
  enabled = true,
}: UseUnreadNotificationsCountOptions = {}) {
  return useQuery({
    queryKey: unreadNotificationsCountKey,
    queryFn: notificationApi.getUnreadCount,
    enabled,
  });
}
