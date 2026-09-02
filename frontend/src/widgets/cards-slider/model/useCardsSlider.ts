import { useState } from "react";
import { useRouter } from "next/navigation";
import { placeApi } from "@/entities/place";
import { useToggleSave } from "@/features/save-card";
import { useToggleVisit } from "@/features/visit-card";
import { useAuthStore } from "@/features/auth";
import { ROUTES } from "@/shared/config/routes";
import { useLocale } from "@/shared/i18n";
import type { ICard, SelectedCard } from "@/shared/types/card";

export function useCardsSlider() {
  const [selected, setSelected] = useState<SelectedCard | null>(null);
  const { mutate: toggleSave } = useToggleSave();
  const { mutate: toggleVisit } = useToggleVisit();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const locale = useLocale();

  function viewMore() {
    router.push(ROUTES.exploring);
  }

  // Save / visited need an account — send a guest to sign-in instead.
  function requireAuth() {
    if (user) {
      return true;
    }

    router.push(ROUTES.signIn);

    return false;
  }

  async function handleCardClick(card: ICard, rect: DOMRect) {
    try {
      const full = await placeApi.getById(card.id as number, { lang: locale });

      setSelected({ card: full ?? card, rect });
    } catch {
      setSelected({ card, rect });
    }
  }

  return {
    selected,
    isSelectedSaved: selected?.card.isSaved ?? false,
    isSelectedVisited: selected?.card.isVisited ?? false,
    viewMore,
    handleCardClick,
    closeSelected: () => setSelected(null),
    toggleSaveSelected: () => {
      if (!requireAuth()) {
        return;
      }

      if (!selected?.card.id) {
        return;
      }

      toggleSave(selected.card.id, {
        onSuccess: (updated) =>
          setSelected(
            (prev) =>
              prev && {
                ...prev,
                card: { ...prev.card, isSaved: updated.isSaved },
              },
          ),
      });
    },
    toggleVisitSelected: () => {
      if (!requireAuth()) {
        return;
      }

      if (!selected?.card.id) {
        return;
      }

      toggleVisit(selected.card.id, {
        onSuccess: (updated) =>
          setSelected(
            (prev) =>
              prev && {
                ...prev,
                card: { ...prev.card, isVisited: updated.isVisited },
              },
          ),
      });
    },
  };
}
