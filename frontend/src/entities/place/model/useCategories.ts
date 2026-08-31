import { useQuery } from "@tanstack/react-query";
import { placeApi } from "../api/placeApi";
import type { Category } from "@/shared/types/category";

export const categoriesKey = ["places", "categories"] as const;

export function useCategories(initialData?: Category[]) {
  return useQuery({
    queryKey: categoriesKey,
    queryFn: () => placeApi.getCategories(),
    initialData,
    staleTime: 5 * 60_000,
  });
}
