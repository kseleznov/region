"use client";

import Image from "next/image";
import { cn } from "@/shared/lib/cn";
import { WeatherIcon } from "@/shared/ui/icons";
import { City } from "../model/types";

interface CityCardProps extends City {
  isSelected?: boolean;
  onSelect?: () => void;
}

export function CityCard({
  name,
  image,
  country,
  weather,
  isSelected,
  onSelect,
  available,
}: CityCardProps) {
  return (
    <li
      onClick={available ? onSelect : undefined}
      className={cn(
        "relative rounded-[28px] overflow-hidden aspect-[3/4]",
        available ? "cursor-pointer" : "cursor-not-allowed",
        isSelected ? "ring-4 ring-brand-purple" : "",
      )}
    >
      <Image
        src={image}
        alt={name}
        fill
        sizes="50vw"
        className="object-cover"
      />

      {!isSelected && <div className="absolute inset-0 bg-black/50" />}

      {!available && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
            Coming Soon
          </span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {isSelected && (
        <div className="absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-purple">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
      )}

      <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 backdrop-blur-sm">
        <WeatherIcon
          condition={weather.condition}
          className="h-4 w-4 text-white"
        />
        <span className="text-sm font-medium text-white">
          {weather.temperature}°
        </span>
      </div>

      <div className="absolute bottom-4 left-4">
        <p className="text-2xl font-bold text-white leading-tight">{name}</p>
        <p className="mt-0.5 text-sm text-white/60">{country}</p>
      </div>
    </li>
  );
}
