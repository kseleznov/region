import { Header } from "@/widgets/header";
import { CardsSlider } from "@/widgets/cards-slider";
import { CityFacts } from "@/widgets/city-facts";
import { Banner } from "@/shared/ui";

import { getPlaces } from "@/entities/place";
import { CityInfo } from "@/widgets/city-info";

export default async function Overview() {
  const whereToGo = await getPlaces();

  return (
    <>
      <div className="bg-brand-purple">
        <Header />
        <Banner />
      </div>
      <CityInfo />
      <CardsSlider title="Where to go" cards={whereToGo} />
      <CityFacts />
    </>
  );
}
