import type { RatingSummary } from "@/shared/types/card";

export type PlacesSort = "top-rated" | "price-low" | "price-high";

export type PlacesPriceBucket = "free" | "under-10" | "10-25" | "over-25";

/** Query params accepted by `GET /places`. Every field is optional. */
export interface PlacesQuery {
  sort?: PlacesSort;
  price?: PlacesPriceBucket;
  minRating?: 3 | 4 | 4.5;
  openNow?: boolean;
}

/** Body of `POST /places/:id/reviews`. */
export interface ReviewInput {
  /** 1★ … 5★. */
  rating: number;
  text: string;
}

/**
 * Shared shape returned by the review create/update/delete endpoints — the
 * place's rating aggregates after the change. `POST` additionally returns the
 * saved `review` row.
 */
export interface ReviewMutationResult {
  ratingSummary: RatingSummary;
  stars: number;
}
