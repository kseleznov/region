"use client";

import { useState } from "react";
import { useAuthStore } from "@/features/auth";
import { useTipsStore } from "@/features/tips";
import {
  MOCK_BIO,
  MOCK_FOLLOWERS,
  MOCK_FOLLOWING,
} from "./mockProfileSettings";
import type { FollowedUser } from "./types";

export function useProfileSettings() {
  const user = useAuthStore((state) => state.user);
  const tips = useTipsStore((state) => state.tips);
  const removeTip = useTipsStore((state) => state.removeTip);

  const [name, setName] = useState(user?.name ?? "");
  const [bio, setBio] = useState(MOCK_BIO);
  const [followers] = useState<FollowedUser[]>(MOCK_FOLLOWERS);
  const [following, setFollowing] = useState<FollowedUser[]>(MOCK_FOLLOWING);

  const username = user?.email ? user.email.split("@")[0] : "me";

  function updateProfile(next: { name: string; bio: string }) {
    setName(next.name);
    setBio(next.bio);
  }

  function unfollow(id: string) {
    setFollowing((list) => list.filter((person) => person.id !== id));
  }

  return {
    name: name || user?.name || "",
    username,
    bio,
    followers,
    following,
    tips,
    updateProfile,
    unfollow,
    removeTip,
  };
}
