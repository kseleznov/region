import { useMutation, useQueryClient } from "@tanstack/react-query";
import { placeApi, placesKey } from "@/entities/place";

export function useToggleVisit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: placeApi.toggleVisit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: placesKey });
      queryClient.invalidateQueries({ queryKey: ["userProgress"] });
    },
  });
}
