import type { PlacesQuery } from "@/entities/place";
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
  "price-low": "Price (low → high)",
  "price-high": "Price (high → low)",
};

export const PRICE_OPTIONS: PriceOption[] = [
  "free",
  "under-10",
  "10-25",
  "over-25",
];

export const PRICE_LABELS: Record<PriceOption, string> = {
  free: "Free",
  "under-10": "≤ 10€",
  "10-25": "10–25€",
  "over-25": "25€ +",
};

export const RATING_OPTIONS: RatingOption[] = ["any", "3", "4", "4.5"];

/** Per-section flags for which filters deviate from the default. */
export function activeFilterFlags(filters: FiltersState) {
  return {
    sort: filters.sort !== DEFAULT_FILTERS.sort,
    price: filters.price !== DEFAULT_FILTERS.price,
    rating: filters.rating !== DEFAULT_FILTERS.rating,
    openNow: filters.openNow,
  };
}

/** True when at least one filter is set — i.e. the list is narrowed. */
export function hasActiveFilters(filters: FiltersState): boolean {
  return Object.values(activeFilterFlags(filters)).some(Boolean);
}

/** Maps the UI filter state onto the query params `GET /places` understands. */
export function toPlacesQuery(filters: FiltersState): PlacesQuery {
  return {
    sort: filters.sort === "top-rated" ? undefined : filters.sort,
    price: filters.price ?? undefined,
    minRating:
      filters.rating === "any"
        ? undefined
        : (Number(filters.rating) as 3 | 4 | 4.5),
    openNow: filters.openNow || undefined,
  };
}
