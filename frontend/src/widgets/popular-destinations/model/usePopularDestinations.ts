import { useSelectCityStore } from "@/features/select-city";
import { City } from "@/entities/city";

export function usePopularDestinations() {
  const { selectedCity, selectCity } = useSelectCityStore();

  function handleCitySelect(name: City["name"]) {
    selectCity(name);
  }

  return {
    handleCitySelect,
    selectedCity,
  };
}
