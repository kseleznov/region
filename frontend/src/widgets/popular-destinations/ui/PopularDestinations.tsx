"use client";

import { City, CityCard } from "@/entities/city";
import { cities } from "@/entities/city";
import { useSelectCityStore } from "@/features/select-city";
import { toLowerCase } from "@/shared/lib/toLowerCase";

export function PopularDestinations() {
  const { selectedCity, selectCity } = useSelectCityStore();

  function handleCitySelect(name: City["name"]) {
    const formattedCityName = toLowerCase(name);

    selectCity(formattedCityName);
  }

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
            isSelected={selectedCity === toLowerCase(city.name)}
            onSelect={() => handleCitySelect(city.name)}
          />
        ))}
      </ul>
    </div>
  );
}
