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
