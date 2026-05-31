import type { ICard } from "@/shared/types/card";

export async function getPlaces(): Promise<ICard[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/places`);

  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }

  return response.json();
}

export async function getPlaceById(id: number): Promise<ICard | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/places/${id}`,
  );

  if (!response.ok) return null;

  return response.json();
}
