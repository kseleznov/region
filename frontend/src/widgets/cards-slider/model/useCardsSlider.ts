import { useState } from "react";
import { useRouter } from "next/navigation";
import { getPlaceById } from "@/entities/place";
import { useToggleSave } from "@/features/save-card";
import { ROUTES } from "@/shared/config/routes";
import type { ICard, SelectedCard } from "@/shared/types/card";

export function useCardsSlider() {
  const [selected, setSelected] = useState<SelectedCard | null>(null);
  const { mutate: toggleSave } = useToggleSave();
  const router = useRouter();

  function viewMore() {
    router.push(ROUTES.exploring);
  }

  async function handleCardClick(card: ICard, rect: DOMRect) {
    try {
      const full = await getPlaceById(card.id as number);
      setSelected({ card: full ?? card, rect });
    } catch {
      setSelected({ card, rect });
    }
  }

  return {
    selected,
    isSelectedSaved: selected?.card.isSaved ?? false,
    viewMore,
    handleCardClick,
    closeSelected: () => setSelected(null),
    toggleSaveSelected: () => {
      if (!selected?.card.id) return;
      toggleSave(selected.card.id, {
        onSuccess: (updated) =>
          setSelected((prev) => prev && { ...prev, card: updated }),
      });
    },
  };
}
