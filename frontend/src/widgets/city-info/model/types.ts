import { getCityInfo } from "@/entities/city";

export type CityInfo = Awaited<ReturnType<typeof getCityInfo>>;
