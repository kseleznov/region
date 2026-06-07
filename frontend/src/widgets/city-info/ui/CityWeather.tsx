import { WeatherIcon } from "@/shared/ui/icons";

interface CityWeatherProps {
  temperature: string;
  condition: string;
}

export function CityWeather({ temperature, condition }: CityWeatherProps) {
  return (
    <div className="flex-1 bg-brand-yellow rounded-2xl p-4 h-32 flex flex-col justify-between">
      <span className="text-sm font-semibold text-dark">Погода</span>
      <div className="flex items-center gap-2">
        <WeatherIcon condition="sunny" className="w-6 h-6 text-dark" />
        <span className="text-2xl font-extrabold text-dark">{temperature}</span>
      </div>
      <span className="text-sm text-dark">{condition}</span>
    </div>
  );
}
