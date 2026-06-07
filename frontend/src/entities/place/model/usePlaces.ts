import { useQuery } from "@tanstack/react-query";
import { placeApi } from "../api/placeApi";
import type { ICard } from "@/shared/types/card";

export const placesKey = ["places"] as const;

export function usePlaces(initialData?: ICard[]) {
  return useQuery({
    queryKey: placesKey,
    queryFn: () => placeApi.getAll(),
    initialData,
    staleTime: 30_000,
  });
}
