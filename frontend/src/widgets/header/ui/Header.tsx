"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { Button } from "@/shared/ui";
import { RankBadge } from "@/entities/rank";
import { useCityName } from "@/entities/city";
import { useTranslation } from "@/shared/i18n";
import { useHeader } from "../model/useHeader";

export function Header() {
  const { selectedCity, userProgress, redirect } = useHeader();
  const { t } = useTranslation();
  const cityName = useCityName();

  return (
    <header className="flex justify-between px-[16px] py-[24px]">
      <Image
        src="/logo.svg"
        alt="circle text"
        width={100}
        height={40}
        priority
      />
      <div className="flex items-center gap-4">
        <RankBadge userProgress={userProgress} />
        <Button variant="selectedCity" onClick={redirect}>
          <MapPin size={16} />
          {selectedCity ? cityName(selectedCity) : t("header.selectCity")}
        </Button>
      </div>
    </header>
  );
}
