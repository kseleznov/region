import type { ICard } from "@/shared/types/card";
import { Category } from "@/shared/types/category";
import { apiClient } from "@/shared/api/axios";
import type { PlacesQuery } from "../model/types";

export const placeApi = {
  getAll: async (
    params?: PlacesQuery,
    cookieHeader?: string,
  ): Promise<ICard[]> => {
    const { data } = await apiClient.get<ICard[]>("/places", {
      params,
      headers: cookieHeader ? { Cookie: cookieHeader } : {},
    });
    return data;
  },

  getCategories: async (): Promise<Category[]> => {
    const { data } = await apiClient.get<Category[]>("/places/categories");

    return data;
  },

  getById: async (id: number): Promise<ICard | null> => {
    try {
      const { data } = await apiClient.get<ICard>(`/places/${id}`);

      return data;
    } catch {
      return null;
    }
  },

  toggleSave: async (id: number): Promise<{ isSaved: boolean }> => {
    const { data } = await apiClient.patch<{ isSaved: boolean }>(
      `/places/${id}/save`,
    );

    return data;
  },

  toggleVisit: async (id: number): Promise<{ isVisited: boolean }> => {
    const { data } = await apiClient.patch<{ isVisited: boolean }>(
      `/places/${id}/visit`,
    );
    return data;
  },
};
