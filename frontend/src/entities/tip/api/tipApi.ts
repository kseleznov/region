import { apiClient } from "@/shared/api/axios";
import type { Locale } from "@/shared/i18n";
import type { MyTip } from "../model/types";

function buildConfig(lang?: Locale) {
  return { params: lang ? { lang } : {} };
}

export const tipApi = {
  getMine: async (lang?: Locale): Promise<MyTip[]> => {
    const { data } = await apiClient.get<MyTip[]>(
      "/tips/me",
      buildConfig(lang),
    );
    return data;
  },

  create: async (
    input: { placeId: number; note: string },
    lang?: Locale,
  ): Promise<MyTip> => {
    const { data } = await apiClient.post<MyTip>(
      "/tips",
      input,
      buildConfig(lang),
    );
    return data;
  },

  update: async (
    input: { id: number; note: string },
    lang?: Locale,
  ): Promise<MyTip> => {
    const { data } = await apiClient.patch<MyTip>(
      `/tips/${input.id}`,
      { note: input.note },
      buildConfig(lang),
    );
    return data;
  },

  remove: async (id: number): Promise<{ id: number }> => {
    const { data } = await apiClient.delete<{ id: number }>(`/tips/${id}`);
    return data;
  },
};
