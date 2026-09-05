"use client";

import { usePublicProfile } from "../model/usePublicProfile";
import type { PublicProfileData } from "../model/types";
import { ProfileTopBar } from "./ProfileTopBar";
import { ProfileHeaderCard } from "./ProfileHeaderCard";
import { CitySelector } from "./CitySelector";
import { CityRankCard } from "./CityRankCard";
import { ProfileTabs } from "./ProfileTabs";
import { CityTips } from "./CityTips";
import { CityVisited } from "./CityVisited";

interface PublicProfileProps {
  profile: PublicProfileData;
}

export function PublicProfile({ profile: initialProfile }: PublicProfileProps) {
  const {
    profile,
    totalPlacesVisited,
    cities,
    selectedCitySlug,
    selectedCity,
    setSelectedCitySlug,
    selectedTab,
    setSelectedTab,
    toggleFollow,
  } = usePublicProfile(initialProfile);

  return (
    <div className="flex flex-col gap-6 px-4 pt-6 pb-4">
      <ProfileTopBar />
      <ProfileHeaderCard
        profile={profile}
        citiesCount={cities.length}
        totalPlacesVisited={totalPlacesVisited}
        onToggleFollow={toggleFollow}
      />

      <CitySelector
        cities={cities}
        selectedCitySlug={selectedCitySlug}
        onSelectCity={setSelectedCitySlug}
      />

      {selectedCity && (
        <>
          <CityRankCard city={selectedCity} />
          <ProfileTabs
            city={selectedCity}
            selectedTab={selectedTab}
            onSelectTab={setSelectedTab}
          />

          {selectedTab === "tips" && (
            <CityTips city={selectedCity} name={profile.name} />
          )}
          {selectedTab === "visited" && <CityVisited city={selectedCity} />}
        </>
      )}
    </div>
  );
}
