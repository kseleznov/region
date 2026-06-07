import { cookies } from "next/headers";
import { ExploringWindow } from "@/widgets/exploring-window";
import { placeApi } from "@/entities/place";

export default async function Exploring() {
  const cookieStore = await cookies();
  const [categories, places] = await Promise.all([
    placeApi.getCategories(),
    placeApi.getAll(cookieStore.toString()),
  ]);

  return <ExploringWindow categories={categories} initialPlaces={places} />;
}
