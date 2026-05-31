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
    { name: "select-city" },
  ),
);
