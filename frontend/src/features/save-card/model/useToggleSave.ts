import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleSavePlace, placesKey } from "@/entities/place";

export function useToggleSave() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleSavePlace,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: placesKey }),
  });
}
