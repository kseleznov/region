import { useSelectCityStore } from "@/features/select-city";
import { toLowerCase } from "@/shared/lib/toLowerCase";
import { City } from "@/entities/city";

export function usePopularDestinations() {
  const { selectedCity, selectCity } = useSelectCityStore();

  function handleCitySelect(name: City["name"]) {
    const formattedCityName = toLowerCase(name);

    selectCity(formattedCityName);
  }

  return {
    handleCitySelect,
    selectedCity,
  };
}
