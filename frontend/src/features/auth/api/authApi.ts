import { apiClient } from "@/shared/api/axios";
import type { AuthTokenResponse, User } from "../model/types";
import type { UserProgress } from "@/entities/rank";

export const authApi = {
  register: (data: { email: string; password: string; name: string }) =>
    apiClient.post<AuthTokenResponse>("/auth/register", data),

  login: (data: { email: string; password: string }) =>
    apiClient.post<AuthTokenResponse>("/auth/login", data),

  logout: () => apiClient.post<AuthTokenResponse>("/auth/logout"),

  refresh: () => apiClient.post<AuthTokenResponse>("/auth/refresh"),

  me: () => apiClient.get<User>("/auth/me"),

  getUserProgress: async (): Promise<UserProgress> => {
    const { data } = await apiClient.get<UserProgress>("/users/me/progress");
    return data;
  },
};
