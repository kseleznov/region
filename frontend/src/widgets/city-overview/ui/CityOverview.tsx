import { CityDescription } from "./CityDescription";
import { CityImages } from "./CityImages";
import { CityInfo } from "./CityInfo";
import { lisbonImages } from "@/shared/mock/lisbon";
import { description } from "@/shared/mock/lisbon";

export function CityOverview() {
  const weather = {
    temperature: "18",
    condition: "Ясно",
  };

  const location = {
    latitude: 23.444,
    longitude: 30.333,
  };

  return (
    <>
      <CityImages images={lisbonImages} />
      <CityInfo weather={weather} location={location} />
      <CityDescription description={description} />
    </>
  );
}
