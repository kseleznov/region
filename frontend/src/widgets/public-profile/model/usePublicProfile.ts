"use client";

import { useMemo, useState } from "react";
import { usePublicProfile as usePublicProfileQuery } from "@/entities/user";
import { useToggleFollow } from "@/features/follow-user";
import { useAuthStore } from "@/features/auth";

export type ProfileTab = "tips" | "visited";

export function usePublicProfile(username: string) {
  const currentUsername = useAuthStore((state) => state.user?.username);
  const { data: profile, isLoading, isError } = usePublicProfileQuery(username);
  const { mutate: toggleFollowMutation } = useToggleFollow();

  const [selectedCitySlugOverride, setSelectedCitySlugOverride] = useState<
    string | null
  >(null);
  const [selectedTab, setSelectedTab] = useState<ProfileTab>("tips");

  const cities = useMemo(() => profile?.cities ?? [], [profile]);
  const selectedCitySlug = selectedCitySlugOverride ?? cities[0]?.citySlug;

  const selectedCity = useMemo(
    () => cities.find((city) => city.citySlug === selectedCitySlug),
    [cities, selectedCitySlug],
  );

  const totalPlacesVisited = cities.reduce(
    (sum, city) => sum + city.placesVisited,
    0,
  );

  function toggleFollow() {
    toggleFollowMutation(username);
  }

  return {
    profile,
    isLoading,
    isError,
    isOwnProfile: !!currentUsername && currentUsername === username,
    totalPlacesVisited,
    cities,
    selectedCitySlug,
    selectedCity,
    setSelectedCitySlug: setSelectedCitySlugOverride,
    selectedTab,
    setSelectedTab,
    toggleFollow,
  };
}
