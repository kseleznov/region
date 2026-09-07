import { useMutation, useQueryClient } from "@tanstack/react-query";
import { placeApi, placesKey } from "@/entities/place";
import { useTranslation } from "@/shared/i18n";
import { useToast } from "@/shared/ui";

export function useDeleteReview() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (placeId: number) => placeApi.deleteMyReview(placeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: placesKey });
      showToast(t("toast.reviewRemoved"));
    },
  });
}
