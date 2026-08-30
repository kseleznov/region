import type { WeatherCondition } from "@/shared/ui/icons";

export type CityRegion = "europe" | "usa" | "asia";

export interface City {
  name: string;
  country: string;
  region: CityRegion;
  image: string;
  weather: {
    temperature: number;
    condition: WeatherCondition;
  };
  available: boolean;
}

export interface CityInfo {
  id: number;
  slug: string;
  name: string;
  description: string;
  images: { url: string; name?: string }[];
  weather: {
    temperature: string;
    condition: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
}
