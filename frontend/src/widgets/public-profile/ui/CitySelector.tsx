import { getRank } from "@/entities/rank";
import { cn } from "@/shared/lib/cn";
import { useTranslation, type TranslationKey } from "@/shared/i18n";
import type { CityGuideStats } from "../model/types";

interface CitySelectorProps {
  cities: CityGuideStats[];
  selectedCitySlug: string | undefined;
  onSelectCity: (citySlug: string) => void;
}

export function CitySelector({
  cities,
  selectedCitySlug,
  onSelectCity,
}: CitySelectorProps) {
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="text-xs font-bold text-brand-gray uppercase tracking-wider">
          {t("publicProfile.cities")}
        </h3>
        <p className="text-xs text-brand-gray">
          {t("publicProfile.citiesCount", { count: cities.length })}
        </p>
      </div>

      <ul className="flex gap-3 overflow-x-auto -mx-4 px-4 [&::-webkit-scrollbar]:hidden">
        {cities.map((city) => {
          const isActive = city.citySlug === selectedCitySlug;
          const rank = getRank(city.placesVisited);

          return (
            <li key={city.citySlug} className="flex-shrink-0 w-40">
              <button
                onClick={() => onSelectCity(city.citySlug)}
                className={cn(
                  "w-full text-left rounded-2xl p-4 flex flex-col gap-2.5 transition-colors",
                  isActive
                    ? "bg-brand-purple text-light"
                    : "bg-search-bg text-dark",
                )}
              >
                <div>
                  <p className="font-bold truncate">{city.cityName}</p>
                  <p
                    className={cn(
                      "text-xs mt-0.5",
                      isActive ? "text-light/70" : "text-brand-gray",
                    )}
                  >
                    {city.placesVisited} {t("publicProfile.places")} ·{" "}
                    {city.tips.length} {t("publicProfile.tipsLabel")}
                  </p>
                </div>
                <span
                  className={cn(
                    "self-start px-3 py-1 rounded-full text-xs font-bold",
                    isActive
                      ? "bg-brand-yellow text-dark"
                      : "bg-light text-brand-pink",
                  )}
                >
                  {t(`ranks.${rank.key}` as TranslationKey)}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
