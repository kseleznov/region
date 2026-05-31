"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardDetail } from "@/entities/card";
import { useSaveCardStore } from "@/features/save-card";
import type { ICard, SelectedCard } from "@/shared/types/card";
import { usePlaceSlider } from "../model/usePlaceSlider";
import { SectionTransition } from "./SectionTransition";
import { SwipeHint } from "./SwipeHint";

type HintPhase = "category" | "card" | "done";

interface PlaceSliderProps {
  categoryId: string;
  places: ICard[];
  categoryIndex: number;
  totalCategories: number;
  categoryName: string;
  onCategoryChange: (newIndex: number, dir: "up" | "down") => void;
  onCardIndexChange: (index: number) => void;
  hintPhase: HintPhase;
  onHideHint: () => void;
  transitionDirection: "up" | "down" | null;
}

interface SliderContentProps {
  categoryId: string;
  places: ICard[];
  savedCards: ICard[];
  onCardSelect: (card: ICard, rect: DOMRect) => void;
  onIndexChange: (index: number) => void;
}

function SliderContent({
  categoryId,
  places,
  savedCards,
  onCardSelect,
  onIndexChange,
}: SliderContentProps) {
  const { emblaRef, cards, selectedIndex } = usePlaceSlider(categoryId, places);

  useEffect(() => {
    onIndexChange(selectedIndex);
  }, [selectedIndex, onIndexChange]);
  return (
    <div ref={emblaRef} className="overflow-hidden h-full">
      <div className="flex h-full">
        {cards.map((card) => (
          <div key={card.name} className="flex-shrink-0 w-full px-4 h-full">
            <Card
              {...card}
              isSaved={savedCards.some((c) => c.name === card.name)}
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
  const { toggleSaveCard, savedCards } = useSaveCardStore();
  const [selected, setSelected] = useState<SelectedCard | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const animDir = useRef<"up" | "down" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startX = 0;
    let startY = 0;
    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;
      if (Math.abs(dy) > Math.abs(dx)) e.preventDefault();
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
    };
  }, []);
  if (transitionDirection !== null) animDir.current = transitionDirection;

  const triggerVerticalSwipe = useCallback(
    (dx: number, dy: number) => {
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      const threshold = 60;
      if (absY > absX && absY > threshold) {
        onHideHint();
        if (dy < 0) {
          const next = (categoryIndex + 1) % totalCategories;
          onCategoryChange(next, "down");
        } else {
          const prev =
            categoryIndex === 0 ? totalCategories - 1 : categoryIndex - 1;
          onCategoryChange(prev, "up");
        }
      }
    },
    [categoryIndex, totalCategories, onCategoryChange, onHideHint],
  );

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart.current) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStart.current.x;
      const dy = t.clientY - touchStart.current.y;
      touchStart.current = null;
      triggerVerticalSwipe(dx, dy);
    },
    [triggerVerticalSwipe],
  );

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    touchStart.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseUp = useCallback(
    (e: React.MouseEvent) => {
      if (!touchStart.current) return;
      const dx = e.clientX - touchStart.current.x;
      const dy = e.clientY - touchStart.current.y;
      touchStart.current = null;
      triggerVerticalSwipe(dx, dy);
    },
    [triggerVerticalSwipe],
  );

  const isSelectedSaved = selected
    ? savedCards.some((c) => c.name === selected.card.name)
    : false;

  async function handleCardSelect(card: ICard, rect: DOMRect) {
    if (card.id) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/places/${card.id}`);
      if (res.ok) {
        const full: ICard = await res.json();
        setSelected({ card: full, rect });
        return;
      }
    }
    setSelected({ card, rect });
  }

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
              enter: (dir: "up" | "down" | null) => ({
                y: dir === "down" ? 300 : dir === "up" ? -300 : 0,
                opacity: 0,
              }),
              center: { y: 0, opacity: 1 },
              exit: (dir: "up" | "down" | null) => ({
                y: dir === "down" ? -300 : dir === "up" ? 300 : 0,
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
              savedCards={savedCards}
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
            onClose={() => setSelected(null)}
            onToggleSave={() => toggleSaveCard(selected.card)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
