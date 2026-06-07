import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelectCityStore } from "@/features/select-city";
import { ROUTES } from "@/shared/config/routes";

export function useHeader() {
  const { selectedCity } = useSelectCityStore();
  const router = useRouter();

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

  function redirect() {
    router.push(ROUTES.region);
  }

  return { selectedCity, userProgress, redirect };
}
