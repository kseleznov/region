import type { ReviewMutationResult } from "@/entities/place";
import type { ICard, Review } from "@/shared/types/card";

/**
 * Fold a review create/update response back into the open place card so the
 * detail sheet reflects the new rating and comment without a refetch.
 */
export function applyReviewResult(
  card: ICard,
  result: ReviewMutationResult & { review: Review },
): ICard {
  const otherReviews = (card.reviews ?? []).filter(
    (review) => review.id !== result.review.id,
  );

  return {
    ...card,
    stars: result.stars,
    ratingSummary: result.ratingSummary,
    reviews: [result.review, ...otherReviews],
    myReview: {
      id: result.review.id,
      rating: result.review.rating,
      text: result.review.text,
    },
  };
}
