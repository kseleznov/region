"use client";

import { PopularDestinations } from "@/widgets/popular-destinations";
import { SearchCity } from "@/features/search-city";
import { RegionSelector } from "@/features/select-region";
import { BackButton } from "@/shared/ui";
import { ConfirmCityButton } from "@/features/select-city";

export default function Region() {
  return (
    <div className="px-[16px] py-[24px]">
      <div className="flex gap-[10px] mb-[24px]">
        <BackButton />
        <h1 className="text-dark text-2xl font-extrabold">Choose your city</h1>
      </div>
      <div className="mb-[24px]">
        <SearchCity />
      </div>
      <div className="mb-[24px]">
        <RegionSelector />
      </div>
      <PopularDestinations />
      <ConfirmCityButton />
    </div>
  );
}
