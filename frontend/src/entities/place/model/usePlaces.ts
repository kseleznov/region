import { useQuery } from "@tanstack/react-query";
import { useLocale } from "@/shared/i18n";
import { placeApi } from "../api/placeApi";
import type { PlacesQuery } from "./types";
import type { ICard } from "@/shared/types/card";

export const placesKey = ["places"] as const;

export function usePlaces(initialData?: ICard[], query: PlacesQuery = {}) {
  const locale = useLocale();

  return useQuery({
    queryKey: [...placesKey, locale, query],
    queryFn: () => placeApi.getAll(query, { lang: locale }),
    initialData,
    staleTime: 30_000,
  });
}
