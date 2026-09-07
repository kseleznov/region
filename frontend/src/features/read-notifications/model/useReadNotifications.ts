import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  notificationApi,
  notificationsKey,
  unreadNotificationsCountKey,
} from "@/entities/notification";

/**
 * Mark the whole feed, or a single entry, as read. Both mutations refresh the
 * feed and the header's unread badge on success.
 */
export function useReadNotifications() {
  const queryClient = useQueryClient();

  function invalidate() {
    queryClient.invalidateQueries({ queryKey: notificationsKey });
    queryClient.invalidateQueries({ queryKey: unreadNotificationsCountKey });
  }

  const markAll = useMutation({
    mutationFn: notificationApi.markAllRead,
    onSuccess: invalidate,
  });

  const markOne = useMutation({
    mutationFn: (id: number) => notificationApi.markRead(id),
    onSuccess: invalidate,
  });

  return { markAll, markOne };
}
