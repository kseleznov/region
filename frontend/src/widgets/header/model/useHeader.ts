import { useRouter } from "next/navigation";
import { useSelectCityStore } from "@/features/select-city";
import { ROUTES } from "@/shared/config/routes";
import { useAuthStore } from "@/features/auth";
import { useUserProgress, type UserProgress } from "@/entities/rank";

const DEFAULT_PROGRESS: UserProgress = {
  placesVisited: 0,
  districts: 0,
  isNightExplorer: false,
  isFoodHunter: false,
};

export function useHeader() {
  const user = useAuthStore((state) => state.user);
  const { selectedCity } = useSelectCityStore();
  const router = useRouter();

  const { data: userProgress = DEFAULT_PROGRESS } = useUserProgress({
    enabled: !!user,
  });

  function redirect() {
    router.push(ROUTES.region);
  }

  return { selectedCity, userProgress, redirect };
}
