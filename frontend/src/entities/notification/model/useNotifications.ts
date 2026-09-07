import { useQuery } from "@tanstack/react-query";
import { notificationApi } from "../api/notificationApi";

export const notificationsKey = ["notifications"] as const;

export function useNotifications() {
  return useQuery({
    queryKey: notificationsKey,
    queryFn: notificationApi.getMine,
  });
}
