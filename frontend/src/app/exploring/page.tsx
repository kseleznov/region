import { ExploringWindow } from "@/widgets/exploring-window";
import type { Category } from "@/widgets/exploring-window/model/categories";
import type { ICard } from "@/shared/types/card";

async function getCategories(): Promise<Category[]> {
  const res = await fetch("http://localhost:3001/places/categories", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

async function getPlaces(): Promise<ICard[]> {
  const res = await fetch("http://localhost:3001/places", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch places");
  return res.json();
}

export default async function Exploring() {
  const [categories, places] = await Promise.all([getCategories(), getPlaces()]);
  return <ExploringWindow categories={categories} places={places} />;
}
