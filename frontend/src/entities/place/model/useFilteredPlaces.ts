import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { placeApi } from "../api/placeApi";
import { placesKey } from "./usePlaces";
import type { PlacesQuery } from "./types";
import type { ICard } from "@/shared/types/card";

export const filteredPlacesKey = (query: PlacesQuery) =>
  [...placesKey, "filtered", query] as const;

/**
 * Places for the explore page, filtered and sorted by the backend.
 *
 * `initialData` (the SSR list) only seeds the query while no filter is
 * active — otherwise the cache would show the wrong set until the refetch
 * lands. `keepPreviousData` keeps the current list on screen while a new
 * filter combination loads, so the slider doesn't flash empty.
 */
export function useFilteredPlaces(query: PlacesQuery, initialData?: ICard[]) {
  const isUnfiltered = Object.values(query).every(
    (value) => value === undefined,
  );

  return useQuery({
    queryKey: filteredPlacesKey(query),
    queryFn: () => placeApi.getAll(query),
    initialData: isUnfiltered ? initialData : undefined,
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
