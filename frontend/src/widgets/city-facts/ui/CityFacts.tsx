"use client";

import { Sparkles } from "lucide-react";
import { useCityName } from "@/entities/city";
import { useTranslation } from "@/shared/i18n";
import { FactCard } from "./FactCard";
import { useCityFacts } from "../model/useCityFacts";

export function CityFacts() {
  const { emblaRef, selectedIndex, scrollSnaps, scrollTo, facts } =
    useCityFacts();
  const { t } = useTranslation();
  const cityName = useCityName();

  return (
    <div className="mb-[70px]">
      <div className="flex items-center gap-3 mx-4 mb-4">
        <div className="w-10 h-10 rounded-full bg-brand-yellow flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-dark" />
        </div>
        <div>
          <p className="text-xs text-dark/50 font-medium">
            {t("cityFacts.didYouKnow")}
          </p>
          <p className="text-base font-extrabold text-dark leading-tight">
            {t("cityFacts.about", { city: cityName("Lisbon") })}
          </p>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-2 pl-4 pr-4">
          {facts.map((fact, i) => (
            <div key={i} className="flex-[0_0_80%] min-w-0">
              <FactCard fact={fact} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-1.5 mt-3">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            aria-label={t("cityFacts.slideAria", { index: i + 1 })}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i === selectedIndex ? "bg-dark" : "bg-dark/20"
            }`}
            onClick={() => scrollTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
