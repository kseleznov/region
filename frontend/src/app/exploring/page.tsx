import { cookies } from "next/headers";
import { ExploringWindow } from "@/widgets/exploring-window";
import { placeApi } from "@/entities/place";
import { getServerLocale } from "@/shared/i18n/getServerLocale";

export default async function Exploring() {
  const cookieStore = await cookies();
  const locale = await getServerLocale();
  const [categories, places] = await Promise.all([
    placeApi.getCategories(),
    placeApi.getAll(undefined, {
      lang: locale,
      cookieHeader: cookieStore.toString(),
    }),
  ]);

  return <ExploringWindow categories={categories} initialPlaces={places} />;
}
