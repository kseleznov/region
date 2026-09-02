import { useMutation, useQueryClient } from "@tanstack/react-query";
import { placeApi, placesKey } from "@/entities/place";
import { useTranslation } from "@/shared/i18n";
import { useToast } from "@/shared/ui";

export function useToggleVisit() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: placeApi.toggleVisit,
    onSuccess: ({ isVisited }) => {
      queryClient.invalidateQueries({ queryKey: placesKey });
      queryClient.invalidateQueries({ queryKey: ["userProgress"] });
      showToast(t(isVisited ? "toast.visited" : "toast.unvisited"));
    },
  });
}
