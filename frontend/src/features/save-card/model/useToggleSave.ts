import { useMutation, useQueryClient } from "@tanstack/react-query";
import { placeApi, placesKey } from "@/entities/place";

export function useToggleSave() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: placeApi.toggleSave,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: placesKey }),
  });
}
