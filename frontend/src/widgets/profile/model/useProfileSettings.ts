"use client";

import { useAuthStore, useUpdateProfile } from "@/features/auth";
import { useFollowers, useFollowing } from "@/entities/user";
import { useToggleFollow } from "@/features/follow-user";
import { useTips } from "@/entities/tip";
import { useRemoveTip } from "@/features/tips";

export function useProfileSettings() {
  const user = useAuthStore((state) => state.user);
  const { data: followers = [] } = useFollowers();
  const { data: following = [] } = useFollowing();
  const { data: tips = [] } = useTips();

  const { mutate: updateProfileMutation } = useUpdateProfile();
  const { mutate: toggleFollowMutation } = useToggleFollow();
  const { mutate: removeTipMutation } = useRemoveTip();

  function updateProfile(next: { name: string; bio: string }) {
    updateProfileMutation(next);
  }

  function unfollow(username: string) {
    toggleFollowMutation(username);
  }

  function removeTip(id: number) {
    removeTipMutation(id);
  }

  return {
    name: user?.name ?? "",
    username: user?.username ?? "",
    bio: user?.bio ?? "",
    followers,
    following,
    tips,
    updateProfile,
    unfollow,
    removeTip,
  };
}
