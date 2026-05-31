import { ICard } from "@/shared/types/card";
import { create } from "zustand";

interface SaveCardStore {
  savedCards: ICard[];
  toggleSaveCard: (card: ICard) => void;
}

export const useSaveCardStore = create<SaveCardStore>((set) => ({
  savedCards: [],

  toggleSaveCard: (card) =>
    set((state) => {
      const isSaved = state.savedCards.some((c) => c.name === card.name);
      return {
        savedCards: isSaved
          ? state.savedCards.filter((c) => c.name !== card.name)
          : [...state.savedCards, card],
      };
    }),
}));
