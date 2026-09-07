import { apiClient } from "@/shared/api/axios";
import type { Locale } from "@/shared/i18n";
import type { FollowedUser, PublicProfileData } from "../model/types";

export interface UpdateMeInput {
  name?: string;
  bio?: string;
}

export interface UpdateMeResponse {
  id: number;
  email: string;
  name: string;
  username: string;
  bio: string | null;
}

export const userApi = {
  getPublicProfile: async (
    username: string,
    lang?: Locale,
  ): Promise<PublicProfileData> => {
    const { data } = await apiClient.get<PublicProfileData>(
      `/users/${username}`,
      { params: lang ? { lang } : {} },
    );
    return data;
  },

  getFollowers: async (): Promise<FollowedUser[]> => {
    const { data } = await apiClient.get<FollowedUser[]>("/users/me/followers");
    return data;
  },

  getFollowing: async (): Promise<FollowedUser[]> => {
    const { data } = await apiClient.get<FollowedUser[]>("/users/me/following");
    return data;
  },

  updateMe: async (input: UpdateMeInput): Promise<UpdateMeResponse> => {
    const { data } = await apiClient.patch<UpdateMeResponse>(
      "/users/me",
      input,
    );
    return data;
  },

  toggleFollow: async (
    username: string,
  ): Promise<{ isFollowing: boolean; followersCount: number }> => {
    const { data } = await apiClient.patch<{
      isFollowing: boolean;
      followersCount: number;
    }>(`/users/${username}/follow`);
    return data;
  },
};
