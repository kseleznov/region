"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Card } from "@/entities/card";
import { CardDetail } from "@/entities/card";
import { Button } from "@/shared/ui";
import { ViewAllArrowIcon } from "@/shared/ui/icons";
import type { ICard, SelectedCard } from "@/shared/types/card";
import { useSaveCardStore } from "@/features/save-card";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/config/routes";

interface CardSliderProps {
  title: string;
  cards: ICard[];
}

export function OverviewSlider({ title, cards }: CardSliderProps) {
  const [selected, setSelected] = useState<SelectedCard | null>(null);
  const { toggleSaveCard, savedCards } = useSaveCardStore();
  const router = useRouter();

  const isSelectedSaved = selected
    ? savedCards.some((c) => c.name === selected.card.name)
    : false;

  function viewMore() {
    router.push(ROUTES.exploring);
  }

  async function handleCardClick(card: ICard, rect: DOMRect) {
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
            isSaved={savedCards.some((c) => c.name === card.name)}
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
            onClose={() => setSelected(null)}
            onToggleSave={() => toggleSaveCard(selected.card)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
