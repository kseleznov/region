import type { ICard } from "@/shared/types/card";
import { Category } from "@/shared/types/category";
import { apiClient } from "@/shared/api/axios";

export async function getPlaces(): Promise<ICard[]> {
  const { data } = await apiClient.get<ICard[]>("/places");
  return data;
}

export async function getCategories(): Promise<Category[]> {
  const { data } = await apiClient.get<Category[]>("/places/categories");
  return data;
}

export async function getPlaceById(id: number): Promise<ICard | null> {
  try {
    const { data } = await apiClient.get<ICard>(`/places/${id}`);
    return data;
  } catch {
    return null;
  }
}

export async function toggleSavePlace(id: number): Promise<ICard> {
  const { data } = await apiClient.patch<ICard>(`/places/${id}/save`);
  return data;
}
