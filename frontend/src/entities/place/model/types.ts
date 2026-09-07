export type PlacesSort = "top-rated" | "price-low" | "price-high";

export type PlacesPriceBucket = "free" | "under-10" | "10-25" | "over-25";

/** Which overview section a place belongs to. Defaults to "attraction". */
export type PlacesKind = "attraction" | "food";

/** Query params accepted by `GET /places`. Every field is optional. */
export interface PlacesQuery {
  kind?: PlacesKind;
  sort?: PlacesSort;
  price?: PlacesPriceBucket;
  minRating?: 3 | 4 | 4.5;
  openNow?: boolean;
}
