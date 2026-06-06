import { useSelectCityStore } from "../model/useSelectCityStore";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/config/routes";

export function useConfirmCityButton() {
  const { selectedCity } = useSelectCityStore();
  const router = useRouter();

  function onClick() {
    router.push(ROUTES.overview);
  }

  return {
    selectedCity,
    onClick,
  };
}
