"use client";

import { useNotifications } from "@/entities/notification";
import { useReadNotifications } from "@/features/read-notifications";

export function useNotificationsFeed() {
  const { data: notifications = [], isLoading } = useNotifications();
  const { markAll, markOne } = useReadNotifications();

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  return {
    notifications,
    isLoading,
    isEmpty: !isLoading && notifications.length === 0,
    unreadCount,
    isMarkingAll: markAll.isPending,
    markAllRead: () => markAll.mutate(),
    markOneRead: (id: number) => markOne.mutate(id),
  };
}
