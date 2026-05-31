import { Header } from "@/widgets/header";
import { OverviewSlider } from "@/widgets/overview-slider";
import { CityFacts } from "@/widgets/city-facts";
import { Banner } from "@/shared/ui";
import { CityOverview } from "@/widgets/city-overview";
import type { ICard } from "@/shared/types/card";

async function getPlaces(): Promise<ICard[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/places`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch places");
  return res.json();
}

export default async function Overview() {
  const placesToGo = await getPlaces();
  return (
    <>
      <div className="bg-brand-purple">
        <Header />
        <Banner />
      </div>
      <CityOverview />
      <OverviewSlider title="Where to go" cards={placesToGo} />
      <CityFacts />
    </>
  );
}
