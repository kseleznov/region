import { useQuery } from '@tanstack/react-query';
import { getPlaces } from '../api';
import type { ICard } from '@/shared/types/card';

export const placesKey = ['places'] as const;

export function usePlaces(initialData?: ICard[]) {
  return useQuery({
    queryKey: placesKey,
    queryFn: getPlaces,
    initialData,
    staleTime: 30_000,
  });
}
