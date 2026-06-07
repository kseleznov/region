import { Header } from "@/widgets/header";
import { CardsSlider } from "@/widgets/cards-slider";
import { CityFacts } from "@/widgets/city-facts";
import { Banner } from "@/shared/ui";
import { cookies } from "next/headers";
import { placeApi } from "@/entities/place";
import { CityInfo } from "@/widgets/city-info";

export default async function Overview() {
  const cookieStore = await cookies();
  const whereToGo = await placeApi.getAll(cookieStore.toString());

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
