"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { placeApi } from "@/entities/place";
import { useToggleSave } from "@/features/save-card";
import { useToggleVisit } from "@/features/visit-card";
import { useAddTip } from "@/features/tips";
import { useAuthStore } from "@/features/auth";
import { ROUTES } from "@/shared/config/routes";
import { useLocale } from "@/shared/i18n";
import type { ICard, SelectedCard } from "@/shared/types/card";

export function usePlaceDetail() {
  const [selected, setSelected] = useState<SelectedCard | null>(null);
  const { mutate: toggleSave } = useToggleSave();
  const { mutate: toggleVisit } = useToggleVisit();
  const { mutate: addTip } = useAddTip();
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const locale = useLocale();

  function requireAuth() {
    if (user) {
      return true;
    }

    router.push(ROUTES.signIn);
    return false;
  }

  async function openPlace(placeId: number, rect: DOMRect) {
    try {
      const full = await placeApi.getById(placeId, { lang: locale });
      if (full) {
        setSelected({ card: full, rect });
      }
    } catch {
      // Place fetch failed — nothing to open.
    }
  }

  function selectSimilar(card: ICard, rect: DOMRect) {
    setSelected({ card, rect });
  }

  function closeSelected() {
    setSelected(null);
  }

  function toggleSaveSelected() {
    if (!requireAuth() || !selected?.card.id) {
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
  }

  function toggleVisitSelected() {
    if (!requireAuth() || !selected?.card.id) {
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
  }

  function addTipForSelected(note: string) {
    if (!requireAuth() || !selected?.card.id) {
      return;
    }

    addTip({ placeId: selected.card.id, note });
  }

  return {
    selected,
    isSelectedSaved: selected?.card.isSaved ?? false,
    isSelectedVisited: selected?.card.isVisited ?? false,
    openPlace,
    selectSimilar,
    closeSelected,
    toggleSaveSelected,
    toggleVisitSelected,
    addTipForSelected,
  };
}
