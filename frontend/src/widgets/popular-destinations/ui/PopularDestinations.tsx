"use client";

import { CityCard } from "@/entities/city";
import { useTranslation } from "@/shared/i18n";
import { usePopularDestinations } from "../model/usePopularDestinations";

export function PopularDestinations() {
  const { visibleCities, selectedCity, handleCitySelect } =
    usePopularDestinations();
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-lg font-bold text-dark mb-[15px]">
        {t("region.popular.title")}
      </h1>

      {visibleCities.length === 0 ? (
        <p className="text-sm text-brand-gray">{t("region.popular.empty")}</p>
      ) : (
        <ul className="grid grid-cols-2 gap-3">
          {visibleCities.map((city) => (
            <CityCard
              key={city.name}
              {...city}
              isSelected={selectedCity === city.name}
              onSelect={() => handleCitySelect(city.name)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
