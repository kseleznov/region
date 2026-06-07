import { ExploringWindow } from "@/widgets/exploring-window";
import { getPlaces, getCategories } from "@/entities/place";

export default async function Exploring() {
  const [categories, places] = await Promise.all([
    getCategories(),
    getPlaces(),
  ]);

  return <ExploringWindow categories={categories} initialPlaces={places} />;
}
