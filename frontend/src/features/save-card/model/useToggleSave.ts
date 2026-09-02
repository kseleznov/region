import { useMutation, useQueryClient } from "@tanstack/react-query";
import { placeApi, placesKey } from "@/entities/place";
import { useTranslation } from "@/shared/i18n";
import { useToast } from "@/shared/ui";

export function useToggleSave() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: placeApi.toggleSave,
    onSuccess: ({ isSaved }) => {
      queryClient.invalidateQueries({ queryKey: placesKey });
      showToast(t(isSaved ? "toast.saved" : "toast.unsaved"));
    },
  });
}
