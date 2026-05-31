"use client";

import { CityWeather } from "./CityWeather";
import { CityLocation } from "./CityLocation";
import { useCityInfo } from "../model/useCityInfo";
import { CityImages } from "./CityImages";
import { CityDescription } from "./CityDescription";

export function CityInfo() {
  const data = useCityInfo();

  if (!data) return null;

  const { images, weather, location, description } = data;

  return (
    <>
      <CityImages images={images} />
      <div className="flex gap-4 mx-4 mb-[20px]">
        <CityWeather
          temperature={weather.temperature}
          condition={weather.condition}
        />
        <CityLocation
          latitude={location.latitude}
          longitude={location.longitude}
        />
      </div>
      <CityDescription description={description} />
    </>
  );
}
