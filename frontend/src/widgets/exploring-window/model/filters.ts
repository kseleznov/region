import type { PlacesQuery } from "@/entities/place";
import type { TranslationKey } from "@/shared/i18n";
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

export const SORT_OPTIONS: SortOption[] = [
  "top-rated",
  "price-low",
  "price-high",
];

export const SORT_LABEL_KEYS: Record<SortOption, TranslationKey> = {
  "top-rated": "explore.sort.top-rated",
  "price-low": "explore.sort.price-low",
  "price-high": "explore.sort.price-high",
};

export const PRICE_OPTIONS: PriceOption[] = [
  "free",
  "under-10",
  "10-25",
  "over-25",
];

export const PRICE_LABEL_KEYS: Record<PriceOption, TranslationKey> = {
  free: "explore.priceBuckets.free",
  "under-10": "explore.priceBuckets.under-10",
  "10-25": "explore.priceBuckets.10-25",
  "over-25": "explore.priceBuckets.over-25",
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
