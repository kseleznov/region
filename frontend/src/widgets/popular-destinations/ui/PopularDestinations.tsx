"use client";

import { CityCard } from "@/entities/city";
import { cities } from "@/entities/city";
import { useSelectCityStore } from "@/features/select-city";

export function PopularDestinations() {
  const { selectedCity, selectCity } = useSelectCityStore();

  return (
    <div>
      <h1 className="text-lg font-bold text-dark mb-[15px]">
        Popular destinations
      </h1>

      <ul className="grid grid-cols-2 gap-3">
        {cities.map((city) => (
          <CityCard
            key={city.name}
            {...city}
            isSelected={selectedCity === city.name}
            onSelect={() => selectCity(city.name)}
          />
        ))}
      </ul>
    </div>
  );
}
