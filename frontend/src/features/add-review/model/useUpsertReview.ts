import { useMutation, useQueryClient } from "@tanstack/react-query";
import { placeApi, placesKey, type ReviewInput } from "@/entities/place";
import { useLocale, useTranslation } from "@/shared/i18n";
import { useToast } from "@/shared/ui";

export interface UpsertReviewInput extends ReviewInput {
  placeId: number;
  /** True when the visitor already had a review — picks the toast copy. */
  isUpdate: boolean;
}

export function useUpsertReview() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { t } = useTranslation();
  const locale = useLocale();

  return useMutation({
    mutationFn: ({ placeId, rating, text }: UpsertReviewInput) =>
      placeApi.upsertReview(placeId, { rating, text }, locale),
    onSuccess: (_result, { isUpdate }) => {
      queryClient.invalidateQueries({ queryKey: placesKey });
      showToast(t(isUpdate ? "toast.reviewUpdated" : "toast.reviewAdded"));
    },
  });
}
