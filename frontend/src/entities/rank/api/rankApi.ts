import { apiClient } from "@/shared/api/axios";
import type { UserProgress } from "../model/types";

export const rankApi = {
  getUserProgress: async (): Promise<UserProgress> => {
    const { data } = await apiClient.get<UserProgress>("/users/me/progress");
    return data;
  },
};
