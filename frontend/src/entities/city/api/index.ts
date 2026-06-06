import { apiClient } from "@/shared/api/axios";
import { CityInfo } from "../model/types";

export async function getCityInfo(city: string): Promise<CityInfo | null> {
  try {
    const { data } = await apiClient.get<CityInfo>(`/cities/${city}`);

    return data;
  } catch {
    return null;
  }
}
