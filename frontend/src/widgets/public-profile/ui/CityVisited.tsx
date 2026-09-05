import Image from "next/image";
import { useTranslation } from "@/shared/i18n";
import type { CityGuideStats } from "../model/types";

interface CityVisitedProps {
  city: CityGuideStats;
}

export function CityVisited({ city }: CityVisitedProps) {
  const { t } = useTranslation();

  if (city.visited.length === 0) {
    return (
      <p className="text-sm text-brand-gray bg-search-bg rounded-2xl p-4">
        {t("publicProfile.noVisitedYet")}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {city.visited.map((place) => (
        <div key={place.id} className="flex flex-col gap-1.5">
          <div className="relative w-full aspect-square rounded-xl overflow-hidden">
            <Image
              src={place.placeImage}
              alt={place.placeName}
              fill
              sizes="120px"
              className="object-cover"
            />
          </div>
          <p className="text-xs font-medium text-dark truncate">
            {place.placeName}
          </p>
        </div>
      ))}
    </div>
  );
}
