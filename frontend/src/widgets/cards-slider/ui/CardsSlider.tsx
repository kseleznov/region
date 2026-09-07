"use client";

import { AnimatePresence } from "framer-motion";
import { Card, CardDetail } from "@/entities/card";
import { usePlaces } from "@/entities/place";
import { Button } from "@/shared/ui";
import { ViewAllArrowIcon } from "@/shared/ui/icons";
import { useTranslation } from "@/shared/i18n";
import { useCardsSlider } from "../model/useCardsSlider";
import type { CardSliderProps } from "../model/types";

export function CardsSlider({
  titleKey = "overview.whereToGo",
  query,
  initialCards,
}: CardSliderProps) {
  const { data: cards = [] } = usePlaces(initialCards, query);
  const { t } = useTranslation();
  const {
    selected,
    isSelectedSaved,
    isSelectedVisited,
    viewMore,
    handleCardClick,
    closeSelected,
    toggleSaveSelected,
    toggleVisitSelected,
    addTipForSelected,
  } = useCardsSlider();

  // Nothing to show (e.g. a city with no places for this section) — skip it
  // rather than render an empty titled block.
  if (cards.length === 0) {
    return null;
  }

  return (
    <div className="mb-[70px]">
      <div
        className="flex items-center justify-between mb-[24px] px-4"
        onClick={viewMore}
      >
        <h1 className="text-[32px] leading-[1.05] font-extrabold">
          {t(titleKey)}
        </h1>
        <div className="flex items-center gap-[12px]">
          <span className="text-brand-purple font-semibold text-[16px]">
            {t("common.viewAll")}
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
            key={selected.card.id ?? selected.card.name}
            card={selected.card}
            sourceRect={selected.rect}
            isSaved={isSelectedSaved}
            isVisited={isSelectedVisited}
            onClose={closeSelected}
            onToggleSave={toggleSaveSelected}
            onToggleVisit={toggleVisitSelected}
            onSelectSimilar={handleCardClick}
            onAddTip={addTipForSelected}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
