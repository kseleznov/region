import type { Chip } from "@/shared/ui/chips";

export const ALL_REGIONS_ID = "all";

export const regions: Chip[] = [
  {
    id: ALL_REGIONS_ID,
    value: "All",
  },
  {
    id: "europe",
    value: "Europe",
  },
  {
    id: "usa",
    value: "USA",
  },
  {
    id: "asia",
    value: "Asia",
  },
];
