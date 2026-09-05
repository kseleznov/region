import { useMemo, useState } from "react";
import type { CityGuideStats, PublicProfileData } from "./types";

export type ProfileTab = "tips" | "visited";

export function usePublicProfile(initialProfile: PublicProfileData) {
  const [isFollowing, setIsFollowing] = useState(initialProfile.isFollowing);
  const [selectedCitySlug, setSelectedCitySlug] = useState(
    initialProfile.cities[0]?.citySlug,
  );
  const [selectedTab, setSelectedTab] = useState<ProfileTab>("tips");

  const followersCount =
    initialProfile.followersCount +
    (isFollowing === initialProfile.isFollowing ? 0 : isFollowing ? 1 : -1);

  const totalPlacesVisited = initialProfile.cities.reduce(
    (sum, city) => sum + city.placesVisited,
    0,
  );

  const selectedCity: CityGuideStats | undefined = useMemo(
    () =>
      initialProfile.cities.find((city) => city.citySlug === selectedCitySlug),
    [initialProfile.cities, selectedCitySlug],
  );

  function toggleFollow() {
    setIsFollowing((value) => !value);
  }

  return {
    profile: { ...initialProfile, isFollowing, followersCount },
    totalPlacesVisited,
    cities: initialProfile.cities,
    selectedCitySlug,
    selectedCity,
    setSelectedCitySlug,
    selectedTab,
    setSelectedTab,
    toggleFollow,
  };
}
