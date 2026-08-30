"use client";

import { CityCard } from "@/entities/city";
import { usePopularDestinations } from "../model/usePopularDestinations";

export function PopularDestinations() {
  const { visibleCities, selectedCity, handleCitySelect } =
    usePopularDestinations();

  return (
    <div>
      <h1 className="text-lg font-bold text-dark mb-[15px]">
        Popular destinations
      </h1>

      {visibleCities.length === 0 ? (
        <p className="text-sm text-brand-gray">Нет городов в этом регионе</p>
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
