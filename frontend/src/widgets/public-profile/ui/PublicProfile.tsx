"use client";

import { useTranslation } from "@/shared/i18n";
import { usePublicProfile } from "../model/usePublicProfile";
import { ProfileTopBar } from "./ProfileTopBar";
import { ProfileHeaderCard } from "./ProfileHeaderCard";
import { CitySelector } from "./CitySelector";
import { CityRankCard } from "./CityRankCard";
import { ProfileTabs } from "./ProfileTabs";
import { CityTips } from "./CityTips";
import { CityVisited } from "./CityVisited";

interface PublicProfileProps {
  username: string;
}

export function PublicProfile({ username }: PublicProfileProps) {
  const { t } = useTranslation();
  const {
    profile,
    isLoading,
    isError,
    isOwnProfile,
    cities,
    selectedCitySlug,
    selectedCity,
    setSelectedCitySlug,
    selectedTab,
    setSelectedTab,
    toggleFollow,
  } = usePublicProfile(username);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 px-4 pt-6 pb-4">
        <ProfileTopBar />
        <p className="text-sm text-brand-gray text-center py-12">
          {t("common.loading")}
        </p>
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="flex flex-col gap-6 px-4 pt-6 pb-4">
        <ProfileTopBar />
        <p className="text-sm text-brand-gray text-center py-12">
          {t("publicProfile.notFound")}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4 pt-6 pb-4">
      <ProfileTopBar />
      <ProfileHeaderCard
        profile={profile}
        citiesCount={cities.length}
        isOwnProfile={isOwnProfile}
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
