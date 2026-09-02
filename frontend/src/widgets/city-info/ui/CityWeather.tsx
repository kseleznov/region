"use client";

import { WeatherIcon } from "@/shared/ui/icons";
import { useTranslation } from "@/shared/i18n";

interface CityWeatherProps {
  temperature: string;
  condition: string;
}

export function CityWeather({ temperature, condition }: CityWeatherProps) {
  const { t } = useTranslation();

  return (
    <div className="flex-1 bg-brand-yellow rounded-2xl p-4 h-32 flex flex-col justify-between">
      <span className="text-sm font-semibold text-dark">
        {t("cityInfo.weather")}
      </span>
      <div className="flex items-center gap-2">
        <WeatherIcon condition="sunny" className="w-6 h-6 text-dark" />
        <span className="text-2xl font-extrabold text-dark">{temperature}</span>
      </div>
      <span className="text-sm text-dark">{condition}</span>
    </div>
  );
}
