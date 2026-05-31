import { Header } from "@/widgets/header";
import { OverviewSlider } from "@/widgets/overview-slider";
import { CityFacts } from "@/widgets/city-facts";
import { Banner } from "@/shared/ui";
import { CityOverview } from "@/widgets/city-overview";
import { getPlaces } from "@/entities/place";

export default async function Overview() {
  const whereToGo = await getPlaces();

  return (
    <>
      <div className="bg-brand-purple">
        <Header />
        <Banner />
      </div>
      <CityOverview />
      <OverviewSlider title="Where to go" cards={whereToGo} />
      <CityFacts />
    </>
  );
}
