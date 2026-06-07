"use client";

import { getCityInfo } from "@/entities/city";
import { useSelectCityStore } from "@/features/select-city";
import { useEffect, useState } from "react";
import type { CityInfo } from "./types";

export function useCityInfo() {
  const { selectedCity } = useSelectCityStore();
  const [data, setData] = useState<CityInfo | null>(null);

  useEffect(() => {
    async function fetchData() {
      const cityInfo = await getCityInfo(selectedCity as string);

      setData(cityInfo);
    }

    fetchData();
  }, [selectedCity]);

  return data;
}
