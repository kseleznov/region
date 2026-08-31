export type PlacesSort = "top-rated" | "price-low" | "price-high";

export type PlacesPriceBucket = "free" | "under-10" | "10-25" | "over-25";

/** Query params accepted by `GET /places`. Every field is optional. */
export interface PlacesQuery {
  sort?: PlacesSort;
  price?: PlacesPriceBucket;
  minRating?: 3 | 4 | 4.5;
  openNow?: boolean;
}
