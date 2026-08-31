import { useQuery } from "@tanstack/react-query";
import { useLocaleStore } from "@/shared/i18n";
import { placeApi } from "../api/placeApi";
import type { ICard } from "@/shared/types/card";

export const placesKey = ["places"] as const;

export function usePlaces(initialData?: ICard[]) {
  const locale = useLocaleStore((state) => state.locale);

  return useQuery({
    queryKey: [...placesKey, locale],
    queryFn: () => placeApi.getAll(undefined, { lang: locale }),
    initialData,
    staleTime: 30_000,
  });
}
