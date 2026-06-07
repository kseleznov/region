"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardDetail } from "@/entities/card";
import { usePlaceSlider } from "../model/usePlaceSlider";
import { usePlaceSliderUI } from "../model/usePlaceSliderUI";
import { SectionTransition } from "./SectionTransition";
import { SwipeHint } from "./SwipeHint";
import type { PlaceSliderProps, SliderContentProps } from "../model/types";

function SliderContent({
  categoryId,
  places,
  onCardSelect,
  onIndexChange,
}: SliderContentProps) {
  const { emblaRef, cards, selectedIndex } = usePlaceSlider(categoryId, places);

  useEffect(() => {
    onIndexChange(selectedIndex);
  }, [selectedIndex, onIndexChange]);

  return (
    <div ref={emblaRef} className="overflow-hidden h-full">
      <div className="flex flex-col h-full">
        {cards.map((card) => (
          <div key={card.id ?? card.name} className="flex-[0_0_100%] min-h-0 w-full px-4">
            <Card
              {...card}
              className="w-full max-w-none snap-none aspect-auto h-full"
              onClick={(e) => {
                const rect = (
                  e.currentTarget as HTMLElement
                ).getBoundingClientRect();
                onCardSelect(card, rect);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PlaceSlider({
  categoryId,
  places,
  categoryIndex,
  totalCategories,
  categoryName,
  onCategoryChange,
  onCardIndexChange,
  hintPhase,
  onHideHint,
  transitionDirection,
}: PlaceSliderProps) {
  const {
    selected,
    setSelected,
    isSelectedSaved,
    isSelectedVisited,
    animDir,
    containerRef,
    handleTouchStart,
    handleTouchEnd,
    handleMouseDown,
    handleMouseUp,
    handleCardSelect,
    toggleSaveSelected,
    toggleVisitSelected,
  } = usePlaceSliderUI({
    categoryIndex,
    totalCategories,
    transitionDirection,
    onCategoryChange,
    onHideHint,
  });

  return (
    <>
      <div
        ref={containerRef}
        className="relative [overflow:clip] h-full"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <AnimatePresence
          custom={animDir.current}
          mode="popLayout"
          initial={false}
        >
          <motion.div
            key={categoryId}
            custom={animDir.current}
            variants={{
              enter: (dir: "left" | "right" | null) => ({
                x: dir === "right" ? 300 : dir === "left" ? -300 : 0,
                opacity: 0,
              }),
              center: { x: 0, opacity: 1 },
              exit: (dir: "left" | "right" | null) => ({
                x: dir === "right" ? -300 : dir === "left" ? 300 : 0,
                opacity: 0,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="h-full"
          >
            <SliderContent
              categoryId={categoryId}
              places={places}
              onCardSelect={handleCardSelect}
              onIndexChange={onCardIndexChange}
            />
          </motion.div>
        </AnimatePresence>

        <SwipeHint phase={hintPhase} isVisible={transitionDirection === null} />
        <SectionTransition
          isVisible={transitionDirection !== null}
          categoryName={categoryName}
          direction={transitionDirection}
        />
      </div>

      <AnimatePresence>
        {selected && (
          <CardDetail
            card={selected.card}
            sourceRect={selected.rect}
            isSaved={isSelectedSaved}
            isVisited={isSelectedVisited}
            onClose={() => setSelected(null)}
            onToggleSave={toggleSaveSelected}
            onToggleVisit={toggleVisitSelected}
          />
        )}
      </AnimatePresence>
    </>
  );
}
