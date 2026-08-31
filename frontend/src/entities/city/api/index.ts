import { apiClient } from "@/shared/api/axios";
import type { Locale } from "@/shared/i18n";
import { CityInfo } from "../model/types";

export async function getCityInfo(
  city: string,
  lang?: Locale,
): Promise<CityInfo | null> {
  try {
    const slug = city.toLowerCase();
    const { data } = await apiClient.get<CityInfo>(`/cities/${slug}`, {
      params: lang ? { lang } : {},
    });

    return data;
  } catch {
    return null;
  }
}
