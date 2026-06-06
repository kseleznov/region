import type { ICard } from "@/shared/types/card";
import type { Category } from "@/widgets/exploring-window/model/categories";

export async function getPlaces(): Promise<ICard[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/places`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }

  return response.json();
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/places/categories`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}

export async function getPlaceById(id: number): Promise<ICard | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/places/${id}`,
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function toggleSavePlace(id: number): Promise<ICard> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/places/${id}/save`,
    { method: 'PATCH' },
  );
  if (!response.ok) throw new Error('Failed to toggle save');
  return response.json();
}
