"use client";

import { AnimatePresence } from "framer-motion";
import { Card, CardDetail } from "@/entities/card";
import { usePlaces } from "@/entities/place";
import { Button } from "@/shared/ui";
import { ViewAllArrowIcon } from "@/shared/ui/icons";
import { useCardsSlider } from "../model/useCardsSlider";
import type { CardSliderProps } from "../model/types";

export function CardsSlider({ title, initialCards }: CardSliderProps) {
  const { data: cards = [] } = usePlaces(initialCards);
  const {
    selected,
    isSelectedSaved,
    isSelectedVisited,
    viewMore,
    handleCardClick,
    closeSelected,
    toggleSaveSelected,
    toggleVisitSelected,
  } = useCardsSlider();

  return (
    <div className="mb-[70px]">
      <div
        className="flex items-center justify-between mb-[24px] px-4"
        onClick={viewMore}
      >
        <h1 className="text-[32px] leading-[1.05] font-extrabold">{title}</h1>
        <div className="flex items-center gap-[12px]">
          <span className="text-brand-purple font-semibold text-[16px]">
            View All
          </span>
          <Button variant="viewAll">
            <ViewAllArrowIcon />
          </Button>
        </div>
      </div>

      <ul className="flex overflow-x-auto snap-x snap-mandatory gap-3 pl-4 pr-4 scroll-pl-8 [&::-webkit-scrollbar]:hidden">
        {cards.map((card) => (
          <Card
            {...card}
            key={card.id ?? card.name}
            onClick={(e) => {
              const rect = (
                e.currentTarget as HTMLElement
              ).getBoundingClientRect();
              handleCardClick(card, rect);
            }}
          />
        ))}
      </ul>

      <AnimatePresence>
        {selected && (
          <CardDetail
            card={selected.card}
            sourceRect={selected.rect}
            isSaved={isSelectedSaved}
            isVisited={isSelectedVisited}
            onClose={closeSelected}
            onToggleSave={toggleSaveSelected}
            onToggleVisit={toggleVisitSelected}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
