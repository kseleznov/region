"use client";

import { useTranslation, type TranslationKey } from "@/shared/i18n";
import { useRankBadge } from "../model/useRankBadge";
import { RankGlyph } from "./RankGlyph";
import { RankDetailSheet } from "./RankDetailSheet";
import type { RankBadgeProps } from "../model/types";

const HEADER_COLOR = "var(--yellow)";

export function RankBadge({ userProgress }: RankBadgeProps) {
  const { isOpen, setIsOpen, currentRank } = useRankBadge(userProgress);
  const { t } = useTranslation();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label={t("ranks.badgeAria", {
          name: t(`ranks.${currentRank.key}` as TranslationKey),
        })}
        className="relative w-16 h-16 flex items-center justify-center rb-float hover:scale-105 active:scale-95 transition-transform"
      >
        <RankGlyph rank={currentRank} size="sm" color={HEADER_COLOR} />
      </button>

      <RankDetailSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        userProgress={userProgress}
      />
    </>
  );
}
