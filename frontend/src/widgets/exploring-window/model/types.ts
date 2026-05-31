export type SortOption = "top-rated" | "closest" | "price-low" | "price-high";
export type PriceOption = "free" | "0-10€" | "10-25€" | "25€ +";
export type RatingOption = "any" | "3" | "4" | "4.5";

export interface FiltersState {
  sort: SortOption;
  price: PriceOption | null;
  rating: RatingOption;
  openNow: boolean;
}
