import type { ICard } from "@/shared/types/card";

export type SortOption = "top-rated" | "closest" | "price-low" | "price-high";

export type PriceOption = "free" | "0-10€" | "10-25€" | "25€ +";

export type RatingOption = "any" | "3" | "4" | "4.5";

export interface FiltersState {
  sort: SortOption;
  price: PriceOption | null;
  rating: RatingOption;
  openNow: boolean;
}

export type HintPhase = "category" | "card" | "done";

export interface ExploringWindowProps {
  categories: Category[];
  initialPlaces: ICard[];
}

export interface PlaceSliderProps {
  categoryId: string;
  places: ICard[];
  categoryIndex: number;
  totalCategories: number;
  categoryName: string;
  onCategoryChange: (newIndex: number, dir: "up" | "down") => void;
  onCardIndexChange: (index: number) => void;
  hintPhase: HintPhase;
  onHideHint: () => void;
  transitionDirection: "up" | "down" | null;
}

export interface SliderContentProps {
  categoryId: string;
  places: ICard[];
  onCardSelect: (card: ICard, rect: DOMRect) => void;
  onIndexChange: (index: number) => void;
}

export type Category = {
  id: string;
  value: string;
  subcategories: string[];
};
