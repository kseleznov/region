import type { ICard } from "@/shared/types/card";

export type SortOption = "top-rated" | "price-low" | "price-high";

export type PriceOption = "free" | "under-10" | "10-25" | "over-25";

export type RatingOption = "any" | "3" | "4" | "4.5";

export interface FiltersState {
  sort: SortOption;
  price: PriceOption | null;
  rating: RatingOption;
  openNow: boolean;
}

export type HintPhase = "category" | "card" | "done";

/** Explore swipes categories horizontally; Saved swipes them vertically. */
export type SwipeDirection = "left" | "right" | "up" | "down";

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
  onCategoryChange: (newIndex: number, dir: SwipeDirection) => void;
  onCardIndexChange: (index: number) => void;
  hintPhase: HintPhase;
  onHideHint: () => void;
  transitionDirection: SwipeDirection | null;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
}

export interface SliderContentProps {
  categoryId: string;
  places: ICard[];
  onCardSelect: (card: ICard, rect: DOMRect) => void;
  onIndexChange: (index: number) => void;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
}

export type Category = {
  id: string;
  value: string;
  subcategories: string[];
};
