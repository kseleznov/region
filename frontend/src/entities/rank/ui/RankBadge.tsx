"use client";

import { useTranslation, type TranslationKey } from "@/shared/i18n";
import { useRankBadge } from "../model/useRankBadge";
import { RankGlyph } from "./RankGlyph";
import { ProgressRing } from "./ProgressRing";
import { RankDetailSheet } from "./RankDetailSheet";
import type { RankBadgeProps } from "../model/types";

const HEADER_COLOR = "var(--yellow)";

export function RankBadge({ userProgress }: RankBadgeProps) {
  const { isOpen, setIsOpen, currentRank, progress } =
    useRankBadge(userProgress);
  const { t } = useTranslation();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label={t("ranks.badgeAria", {
          name: t(`ranks.${currentRank.key}` as TranslationKey),
        })}
        className="relative w-11 h-11 flex items-center justify-center rb-float hover:scale-105 active:scale-95 transition-transform"
      >
        <ProgressRing
          progress={progress}
          color={HEADER_COLOR}
          size={44}
          stroke={2.5}
        />
        <div className="absolute inset-[7px] flex items-center justify-center">
          <RankGlyph rank={currentRank} size="sm" color={HEADER_COLOR} />
        </div>
      </button>

      <RankDetailSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        userProgress={userProgress}
      />
    </>
  );
}
