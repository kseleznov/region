import type { ICard } from "@/shared/types/card";
import { Category } from "@/shared/types/category";
import { apiClient } from "@/shared/api/axios";
import type { Locale } from "@/shared/i18n";
import type { PlacesQuery } from "../model/types";

interface RequestOptions {
  /** Content language for translated fields (name, description, …). */
  lang?: Locale;
  /** Forwarded cookie header for server-side requests. */
  cookieHeader?: string;
}

function buildConfig(
  params: Record<string, unknown>,
  { lang, cookieHeader }: RequestOptions = {},
) {
  return {
    params: { ...params, ...(lang ? { lang } : {}) },
    headers: cookieHeader ? { Cookie: cookieHeader } : {},
  };
}

export const placeApi = {
  getAll: async (
    params?: PlacesQuery,
    options?: RequestOptions,
  ): Promise<ICard[]> => {
    const { data } = await apiClient.get<ICard[]>(
      "/places",
      buildConfig({ ...params }, options),
    );
    return data;
  },

  getCategories: async (): Promise<Category[]> => {
    const { data } = await apiClient.get<Category[]>("/places/categories");

    return data;
  },

  getById: async (
    id: number,
    options?: RequestOptions,
  ): Promise<ICard | null> => {
    try {
      const { data } = await apiClient.get<ICard>(
        `/places/${id}`,
        buildConfig({}, options),
      );

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
