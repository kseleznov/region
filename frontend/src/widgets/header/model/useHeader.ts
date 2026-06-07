import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSelectCityStore } from "@/features/select-city";
import { ROUTES } from "@/shared/config/routes";
import { authApi } from "@/features/auth";
import type { UserProgress } from "@/entities/rank";

const DEFAULT_PROGRESS: UserProgress = {
  placesVisited: 0,
  districts: 0,
  isNightExplorer: false,
  isFoodHunter: false,
};

export function useHeader() {
  const { selectedCity } = useSelectCityStore();
  const router = useRouter();

  const { data: userProgress = DEFAULT_PROGRESS } = useQuery({
    queryKey: ["userProgress"],
    queryFn: authApi.getUserProgress,
  });

  function redirect() {
    router.push(ROUTES.region);
  }

  return { selectedCity, userProgress, redirect };
}
