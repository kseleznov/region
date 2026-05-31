"use client";

import { explanationCards } from "@/widgets/explanation-slider/model/explanationCards";
import { useInfiniteScroll } from "../model/useInfiniteScroll";
import { ExplanationCard } from "./ExplanationCard";

export function ExplanationSlider() {
  const { emblaRef } = useInfiniteScroll();

  return (
    <div ref={emblaRef} className="overflow-hidden w-full bg-light mb-[70px]">
      <div className="flex">
        {explanationCards.map((explanationCard, index) => (
          <div className="pl-4" key={index}>
            <ExplanationCard variant={explanationCard.variant}>
              {explanationCard.text}
            </ExplanationCard>
          </div>
        ))}
      </div>
    </div>
  );
}
