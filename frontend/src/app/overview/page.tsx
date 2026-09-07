import { Header } from "@/widgets/header";
import { CardsSlider } from "@/widgets/cards-slider";
import { CityFacts } from "@/widgets/city-facts";
import { Banner } from "@/shared/ui";
import { cookies } from "next/headers";
import { placeApi } from "@/entities/place";
import { CityInfo } from "@/widgets/city-info";
import { getServerLocale } from "@/shared/i18n/getServerLocale";

export default async function Overview() {
  const cookieStore = await cookies();
  const locale = await getServerLocale();
  const requestOptions = {
    lang: locale,
    cookieHeader: cookieStore.toString(),
  };
  const [whereToGo, whereToEat] = await Promise.all([
    placeApi.getAll(undefined, requestOptions),
    placeApi.getAll({ kind: "food" }, requestOptions),
  ]);

  return (
    <>
      <div className="bg-brand-purple">
        <Header />
        <Banner />
      </div>
      <CityInfo />
      <CardsSlider initialCards={whereToGo} />
      <CardsSlider
        titleKey="overview.whereToEat"
        query={{ kind: "food" }}
        initialCards={whereToEat}
      />
      <CityFacts />
    </>
  );
}
