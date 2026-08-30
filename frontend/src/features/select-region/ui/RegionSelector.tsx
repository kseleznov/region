"use client";

import { Chips } from "@/shared/ui";
import { regions } from "../model/regions";
import { useSelectRegionStore } from "../model/useSelectRegionStore";

export function RegionSelector() {
  const selectedRegionId = useSelectRegionStore(
    (state) => state.selectedRegionId,
  );
  const selectRegion = useSelectRegionStore((state) => state.selectRegion);

  return (
    <Chips
      chips={regions}
      activeId={selectedRegionId}
      onChange={selectRegion}
    />
  );
}
