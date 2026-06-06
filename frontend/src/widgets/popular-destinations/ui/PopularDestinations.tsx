"use client";

import { CityCard, cities } from "@/entities/city";
import { toLowerCase } from "@/shared/lib/toLowerCase";
import { usePopularDestinations } from "../model/usePopularDestinations";

export function PopularDestinations() {
  const { selectedCity, handleCitySelect } = usePopularDestinations();

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
