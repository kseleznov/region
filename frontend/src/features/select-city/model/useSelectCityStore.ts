import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SelectCityStore {
  selectedCity: string | null;
  selectCity: (name: string) => void;
}

const initialState = {
  selectedCity: null,
};

export const useSelectCityStore = create<SelectCityStore>()(
  persist(
    (set) => ({
      ...initialState,

      selectCity: (name) =>
        set((state) => ({
          selectedCity: state.selectedCity === name ? null : name,
        })),
    }),
    {
      name: "select-city",
      // v1: city name is now stored in its original casing (was lowercased).
      // Drop any pre-v1 value so a stale "lisbon" doesn't render lowercase.
      version: 1,
      migrate: () => initialState,
    },
  ),
);
