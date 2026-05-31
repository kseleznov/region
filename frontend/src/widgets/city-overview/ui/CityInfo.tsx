"use client";

import { WeatherIcon } from "@/shared/ui/icons";
import { MiniMap } from "@/shared/ui/mini-map";

interface CityInfoProps {
  weather: {
    temperature: string;
    condition: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
}

export function CityInfo({ weather, location }: CityInfoProps) {
  return (
    <>
      <div className="flex gap-4 mx-4 mb-[20px]">
        <div className="flex-1 bg-brand-yellow rounded-2xl p-4 h-32 flex flex-col justify-between">
          <span className="text-sm font-semibold text-dark">Погода</span>
          <div className="flex items-center gap-2">
            <WeatherIcon condition="sunny" className="w-6 h-6 text-dark" />
            <span className="text-2xl font-extrabold text-dark">
              {weather.temperature}
            </span>
          </div>
          <span className="text-sm text-dark">{weather.condition}</span>
        </div>
        <div className="flex-1">
          <MiniMap lat={location.latitude} lng={location.longitude} />
        </div>
      </div>
    </>
  );
}
