"use client";

import Image from "next/image";
import { useSelectCityStore } from "@/features/select-city";
import { ROUTES } from "@/shared/config/routes";
import { Button } from "@/shared/ui";
import { RankBadge } from "@/entities/rank";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Header() {
  const { selectedCity } = useSelectCityStore();
  const router = useRouter();

  function redirect() {
    router.push(ROUTES.region);
  }

  const [userProgress] = useState({
    placesVisited: 0,
    rank: "Insider",
    rankProgress: 24,
    rankMax: 40,
    districts: 3,
    hiddenSpots: 7,
    isNightExplorer: true,
    isFoodHunter: true,
  });

  return (
    <header className="flex justify-between px-[16px] py-[24px]">
      <Image
        src="/logo.svg"
        alt="circle text"
        width={100}
        height={40}
        priority
      />
      <div className="flex items-center gap-4">
        <RankBadge userProgress={userProgress} />
        <Button variant="selectedCity" onClick={redirect}>
          <MapPin size={16} />
          {selectedCity}
        </Button>
      </div>
    </header>
  );
}
