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
  const whereToGo = await placeApi.getAll(undefined, {
    lang: locale,
    cookieHeader: cookieStore.toString(),
  });

  return (
    <>
      <div className="bg-brand-purple">
        <Header />
        <Banner />
      </div>
      <CityInfo />
      <CardsSlider title="Where to go" initialCards={whereToGo} />
      <CityFacts />
    </>
  );
}
