import type { WeatherCondition } from "@/shared/ui/icons";

export interface City {
  name: string;
  country: string;
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
  images: Record<string, string>[];
  weather: {
    temperature: string;
    condition: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
}
