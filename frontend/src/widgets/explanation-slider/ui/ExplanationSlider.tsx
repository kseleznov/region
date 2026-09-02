"use client";

import { useTranslation } from "@/shared/i18n";
import { explanationCards } from "../model/explanationCards";
import { useInfiniteScroll } from "../model/useInfiniteScroll";
import { ExplanationCard } from "./ExplanationCard";

export function ExplanationSlider() {
  const { emblaRef } = useInfiniteScroll();
  const { t } = useTranslation();

  return (
    <div ref={emblaRef} className="overflow-hidden w-full bg-light mb-[70px]">
      <div className="flex">
        {explanationCards.map((explanationCard, index) => (
          <div className="pl-4" key={index}>
            <ExplanationCard variant={explanationCard.variant}>
              {t(explanationCard.textKey)}
            </ExplanationCard>
          </div>
        ))}
      </div>
    </div>
  );
}
