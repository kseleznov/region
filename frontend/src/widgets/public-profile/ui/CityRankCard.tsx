"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  getRankProgress,
  ProgressRing,
  RankDetailSheet,
  RankGlyph,
} from "@/entities/rank";
import { useTranslation, type TranslationKey } from "@/shared/i18n";
import type { CityGuideStats } from "@/entities/user";

const RANK_COLOR = "var(--pink)";

interface CityRankCardProps {
  city: CityGuideStats;
}

export function CityRankCard({ city }: CityRankCardProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { currentRank, progressPercent } = getRankProgress(city.placesVisited);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center gap-3 bg-search-bg rounded-2xl p-4 active:scale-[0.99] transition-transform"
      >
        <div className="relative w-11 h-11 flex items-center justify-center flex-shrink-0">
          <ProgressRing
            progress={progressPercent}
            color={RANK_COLOR}
            size={44}
            stroke={2.5}
          />
          <div className="absolute inset-[7px] flex items-center justify-center">
            <RankGlyph rank={currentRank} size="sm" color={RANK_COLOR} />
          </div>
        </div>

        <div className="flex-1 text-left">
          <p className="text-xs font-bold text-brand-gray uppercase tracking-wider mb-1">
            {t("publicProfile.rankInCity", { city: city.cityName })}
          </p>
          <span className="font-black text-lg text-brand-pink">
            {t(`ranks.${currentRank.key}` as TranslationKey)}
          </span>
        </div>

        <ChevronRight size={18} className="text-brand-gray flex-shrink-0" />
      </button>

      <RankDetailSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        userProgress={{
          placesVisited: city.placesVisited,
          districts: city.districts,
          isNightExplorer: city.isNightExplorer,
          isFoodHunter: city.isFoodHunter,
        }}
      />
    </>
  );
}
