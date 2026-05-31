import type {
  FiltersState,
  PriceOption,
  RatingOption,
  SortOption,
} from "../model/types";

export const DEFAULT_FILTERS: FiltersState = {
  sort: "top-rated",
  price: null,
  rating: "any",
  openNow: false,
};

export const SORT_LABELS: Record<SortOption, string> = {
  "top-rated": "Top rated",
  closest: "Closest first",
  "price-low": "Price (low → high)",
  "price-high": "Price (high → low)",
};

export const SORT_CHIP_LABELS: Record<SortOption, string> = {
  "top-rated": "Top rated",
  closest: "Closest first",
  "price-low": "Price ↑",
  "price-high": "Price ↓",
};

export const PRICE_OPTIONS: PriceOption[] = [
  "free",
  "0-10€",
  "10-25€",
  "25€ +",
];
export const RATING_OPTIONS: RatingOption[] = ["any", "3", "4", "4.5"];
