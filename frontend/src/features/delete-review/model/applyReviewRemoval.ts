import type { ReviewMutationResult } from "@/entities/place";
import type { ICard } from "@/shared/types/card";

/**
 * Fold a review-deletion response back into the open place card so the detail
 * sheet drops the review and updated rating without a refetch.
 */
export function applyReviewRemoval(
  card: ICard,
  result: ReviewMutationResult,
): ICard {
  return {
    ...card,
    stars: result.stars,
    ratingSummary: result.ratingSummary,
    reviews: (card.reviews ?? []).filter(
      (review) => review.id !== card.myReview?.id,
    ),
    myReview: null,
  };
}
