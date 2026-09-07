import Image from "next/image";
import { useTranslation } from "@/shared/i18n";
import type { CityGuideStats } from "@/entities/user";

interface CityVisitedProps {
  city: CityGuideStats;
  onOpenPlace: (placeId: number, rect: DOMRect) => void;
}

export function CityVisited({ city, onOpenPlace }: CityVisitedProps) {
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
        <div
          key={place.placeId}
          onClick={(event) =>
            onOpenPlace(
              place.placeId,
              event.currentTarget.getBoundingClientRect(),
            )
          }
          className="flex flex-col gap-1.5 cursor-pointer active:scale-[0.98] transition-transform"
        >
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
