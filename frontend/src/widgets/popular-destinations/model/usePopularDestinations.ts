import { useSelectCityStore } from "@/features/select-city";
import { ALL_REGIONS_ID, useSelectRegionStore } from "@/features/select-region";
import { cities, City } from "@/entities/city";

export function usePopularDestinations() {
  const { selectedCity, selectCity } = useSelectCityStore();
  const selectedRegionId = useSelectRegionStore(
    (state) => state.selectedRegionId,
  );

  const visibleCities =
    selectedRegionId === ALL_REGIONS_ID
      ? cities
      : cities.filter((city) => city.region === selectedRegionId);

  function handleCitySelect(name: City["name"]) {
    selectCity(name);
  }

  return {
    visibleCities,
    handleCitySelect,
    selectedCity,
  };
}
