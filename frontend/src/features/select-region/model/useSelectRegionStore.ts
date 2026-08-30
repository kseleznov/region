import { create } from "zustand";
import { ALL_REGIONS_ID } from "./regions";

interface SelectRegionStore {
  selectedRegionId: string;
  selectRegion: (id: string) => void;
}

export const useSelectRegionStore = create<SelectRegionStore>((set) => ({
  selectedRegionId: ALL_REGIONS_ID,
  selectRegion: (id) => set({ selectedRegionId: id }),
}));
