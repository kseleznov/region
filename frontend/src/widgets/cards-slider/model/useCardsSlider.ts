import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSaveCardStore } from "@/features/save-card";
import { getPlaceById } from "@/entities/place";
import { ROUTES } from "@/shared/config/routes";
import type { ICard, SelectedCard } from "@/shared/types/card";

export function useCardsSlider() {
  const [selected, setSelected] = useState<SelectedCard | null>(null);
  const { toggleSaveCard, savedCards } = useSaveCardStore();
  const router = useRouter();

  const isSelectedSaved = selected
    ? savedCards.some((card) => card.name === selected.card.name)
    : false;

  function viewMore() {
    router.push(ROUTES.exploring);
  }

  async function handleCardClick(card: ICard, rect: DOMRect) {
    const full = await getPlaceById(card.id as number);

    if (full) {
      setSelected({ card: full, rect });

      return;
    }

    setSelected({ card, rect });
  }

  function isCardSaved(card: ICard) {
    return savedCards.some((c) => c.name === card.name);
  }

  return {
    selected,
    isSelectedSaved,
    isCardSaved,
    viewMore,
    handleCardClick,
    closeSelected: () => setSelected(null),
    toggleSaveSelected: () => selected && toggleSaveCard(selected.card),
  };
}
