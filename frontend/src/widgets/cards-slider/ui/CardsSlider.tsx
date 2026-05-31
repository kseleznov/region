"use client";

import { AnimatePresence } from "framer-motion";
import { Card, CardDetail } from "@/entities/card";
import { Button } from "@/shared/ui";
import { ViewAllArrowIcon } from "@/shared/ui/icons";
import type { ICard } from "@/shared/types/card";
import { useCardsSlider } from "../model/useCardsSlider";

interface CardSliderProps {
  title: string;
  cards: ICard[];
}

export function CardsSlider({ title, cards }: CardSliderProps) {
  const {
    selected,
    isSelectedSaved,
    isCardSaved,
    viewMore,
    handleCardClick,
    closeSelected,
    toggleSaveSelected,
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
            key={card.name}
            isSaved={isCardSaved(card)}
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
            onClose={closeSelected}
            onToggleSave={toggleSaveSelected}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
