import { CityInfo } from "../model/types";

export async function getCityInfo(city: string): Promise<CityInfo | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cities/${city}`,
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}
