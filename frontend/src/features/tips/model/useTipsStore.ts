import { create } from "zustand";
import type { MyTip } from "./types";

interface TipsStore {
  tips: MyTip[];
  addTip: (tip: Omit<MyTip, "id">) => void;
  editTip: (id: string, note: string) => void;
  removeTip: (id: string) => void;
}

/**
 * Seed data for the mockup — there is no tips backend yet, so this store
 * stands in until that lands. Not persisted: it resets on reload, same as
 * every other mock in this app.
 */
const SEED_TIPS: MyTip[] = [
  {
    id: "tip-seed-1",
    placeName: "Convento do Carmo",
    placeImage:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=200&auto=format",
    category: "Музей",
    cityName: "Лиссабон",
    note: "Приходите к открытию — во дворе почти никого, свет мягкий.",
  },
  {
    id: "tip-seed-2",
    placeName: "Miradouro da Graça",
    placeImage:
      "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=200&auto=format",
    category: "Смотровая площадка",
    cityName: "Лиссабон",
    note: "Лучший закат в городе, берите вино в соседнем киоске.",
  },
];

export const useTipsStore = create<TipsStore>((set) => ({
  tips: SEED_TIPS,
  addTip: (tip) =>
    set((state) => ({
      tips: [{ ...tip, id: `tip-${Date.now()}` }, ...state.tips],
    })),
  editTip: (id, note) =>
    set((state) => ({
      tips: state.tips.map((tip) => (tip.id === id ? { ...tip, note } : tip)),
    })),
  removeTip: (id) =>
    set((state) => ({ tips: state.tips.filter((tip) => tip.id !== id) })),
}));
