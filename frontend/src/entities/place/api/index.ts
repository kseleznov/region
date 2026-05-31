import type { ICard } from "@/shared/types/card";

export async function getPlaces(): Promise<ICard[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/places`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }

  return response.json();
}
