import type { TranslationKey } from "@/shared/i18n";

export const ALL_REGIONS_ID = "all";

export interface RegionOption {
  id: string;
  labelKey: TranslationKey;
}

export const regions: RegionOption[] = [
  { id: ALL_REGIONS_ID, labelKey: "region.regions.all" },
  { id: "europe", labelKey: "region.regions.europe" },
  { id: "usa", labelKey: "region.regions.usa" },
  { id: "asia", labelKey: "region.regions.asia" },
];
