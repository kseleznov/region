import { apiClient } from "@/shared/api/axios";
import type { AppNotification, UnreadCount } from "../model/types";

export const notificationApi = {
  getMine: async (): Promise<AppNotification[]> => {
    const { data } = await apiClient.get<AppNotification[]>("/notifications");
    return data;
  },

  getUnreadCount: async (): Promise<UnreadCount> => {
    const { data } = await apiClient.get<UnreadCount>(
      "/notifications/unread-count",
    );
    return data;
  },

  markAllRead: async (): Promise<UnreadCount> => {
    const { data } = await apiClient.patch<UnreadCount>("/notifications/read");
    return data;
  },

  markRead: async (id: number): Promise<{ id: number; read: true }> => {
    const { data } = await apiClient.patch<{ id: number; read: true }>(
      `/notifications/${id}/read`,
    );
    return data;
  },
};
