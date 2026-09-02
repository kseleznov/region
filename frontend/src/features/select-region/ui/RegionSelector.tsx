"use client";

import { Chips } from "@/shared/ui";
import { useTranslation } from "@/shared/i18n";
import { regions } from "../model/regions";
import { useSelectRegionStore } from "../model/useSelectRegionStore";

export function RegionSelector() {
  const { t } = useTranslation();
  const selectedRegionId = useSelectRegionStore(
    (state) => state.selectedRegionId,
  );
  const selectRegion = useSelectRegionStore((state) => state.selectRegion);

  const chips = regions.map(({ id, labelKey }) => ({
    id,
    value: t(labelKey),
  }));

  return (
    <Chips chips={chips} activeId={selectedRegionId} onChange={selectRegion} />
  );
}
