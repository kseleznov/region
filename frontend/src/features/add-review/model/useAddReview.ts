import { useMutation, useQueryClient } from "@tanstack/react-query";
import { placeApi, placesKey, type ReviewInput } from "@/entities/place";
import { useLocale, useTranslation } from "@/shared/i18n";
import { useToast } from "@/shared/ui";

export interface AddReviewInput extends ReviewInput {
  placeId: number;
}

export function useAddReview() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { t } = useTranslation();
  const locale = useLocale();

  return useMutation({
    mutationFn: ({ placeId, rating, text }: AddReviewInput) =>
      placeApi.addReview(placeId, { rating, text }, locale),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: placesKey });
      showToast(t("toast.reviewAdded"));
    },
  });
}
