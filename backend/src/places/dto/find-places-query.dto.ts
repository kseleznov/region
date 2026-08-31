import { IsIn, IsOptional } from 'class-validator';

export const PLACE_SORT_OPTIONS = [
  'top-rated',
  'price-low',
  'price-high',
] as const;
export type PlaceSortOption = (typeof PLACE_SORT_OPTIONS)[number];

export const PRICE_BUCKETS = ['free', 'under-10', '10-25', 'over-25'] as const;
export type PriceBucket = (typeof PRICE_BUCKETS)[number];

export const MIN_RATING_OPTIONS = ['3', '4', '4.5'] as const;
export type MinRatingOption = (typeof MIN_RATING_OPTIONS)[number];

/**
 * Query params for `GET /places`. Everything is optional — an empty query
 * returns every place ordered by rating. Values arrive as strings, so the
 * numeric/boolean filters stay string-typed here and are coerced in the
 * service (the global ValidationPipe doesn't transform).
 */
export class FindPlacesQueryDto {
  @IsOptional()
  @IsIn(PLACE_SORT_OPTIONS)
  sort?: PlaceSortOption;

  @IsOptional()
  @IsIn(PRICE_BUCKETS)
  price?: PriceBucket;

  @IsOptional()
  @IsIn(MIN_RATING_OPTIONS)
  minRating?: MinRatingOption;

  @IsOptional()
  @IsIn(['true', 'false'])
  openNow?: 'true' | 'false';
}
