import { cn } from "@/shared/lib/cn";
import { useTranslation } from "@/shared/i18n";
import type { ProfileTab } from "../model/usePublicProfile";
import type { CityGuideStats } from "@/entities/user";

interface ProfileTabsProps {
  city: CityGuideStats;
  selectedTab: ProfileTab;
  onSelectTab: (tab: ProfileTab) => void;
}

export function ProfileTabs({
  city,
  selectedTab,
  onSelectTab,
}: ProfileTabsProps) {
  const { t } = useTranslation();

  const tabs: {
    id: ProfileTab;
    labelKey: `publicProfile.tabs.${ProfileTab}`;
    count: number;
  }[] = [
    {
      id: "tips",
      labelKey: "publicProfile.tabs.tips",
      count: city.tips.length,
    },
    {
      id: "visited",
      labelKey: "publicProfile.tabs.visited",
      count: city.visited.length,
    },
  ];

  return (
    <div className="flex gap-1 bg-search-bg rounded-full p-1">
      {tabs.map((tab) => {
        const isActive = tab.id === selectedTab;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={cn(
              "flex-1 rounded-full py-2.5 text-sm font-bold transition-colors",
              isActive ? "bg-brand-purple text-light" : "text-brand-gray",
            )}
          >
            {t(tab.labelKey)} {tab.count}
          </button>
        );
      })}
    </div>
  );
}
