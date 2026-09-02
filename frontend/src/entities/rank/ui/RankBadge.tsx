"use client";

import React from "react";
import { X, MapIcon, MoonIcon, UtensilsIcon } from "lucide-react";
import { useTranslation, type TranslationKey } from "@/shared/i18n";
import { useRankBadge } from "../model/useRankBadge";
import { RankGlyph } from "./RankGlyph";
import type { Rank, RankBadgeProps } from "../model/types";

function ProgressRing({
  progress,
  color,
  size,
  stroke,
}: {
  progress: number;
  color: string;
  size: number;
  stroke: number;
}) {
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - progress / 100);
  const angle = -Math.PI / 2 + (progress / 100) * 2 * Math.PI;
  const cometX = cx + r * Math.cos(angle);
  const cometY = cy + r * Math.sin(angle);
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      style={{ overflow: "visible" }}
    >
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="rgba(0,0,0,0.1)"
        strokeWidth={stroke}
      />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        transform={`rotate(-90 ${cx} ${cy})`}
        className="transition-all duration-700"
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
      {progress > 0 && progress < 100 && (
        <circle
          cx={cometX}
          cy={cometY}
          r={stroke * 0.9}
          fill={color}
          className="rb-comet-pulse"
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
      )}
    </svg>
  );
}

export function RankBadge({ userProgress }: RankBadgeProps) {
  const {
    isOpen,
    setIsOpen,
    currentRank,
    nextRank,
    progress,
    hasAchievements,
  } = useRankBadge(userProgress);
  const { t } = useTranslation();
  const rankName = (rank: Rank) => t(`ranks.${rank.key}` as TranslationKey);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label={t("ranks.badgeAria", { name: rankName(currentRank) })}
        className="relative w-11 h-11 flex items-center justify-center rb-float hover:scale-105 active:scale-95 transition-transform"
      >
        <ProgressRing
          progress={progress}
          color={currentRank.color}
          size={44}
          stroke={2.5}
        />
        <div className="absolute inset-[7px] flex items-center justify-center">
          <RankGlyph rank={currentRank} size="sm" />
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-51 flex items-end">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm rb-fade-in"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative w-full max-w-[430px] mx-auto bg-white rounded-t-3xl p-6 pb-8 rb-slide-up">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              aria-label={t("common.close")}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8 pt-2">
              <div className="relative inline-flex items-center justify-center w-32 h-32 mb-5">
                <ProgressRing
                  progress={progress}
                  color={currentRank.color}
                  size={128}
                  stroke={4}
                />
                <div className="absolute inset-5 flex items-center justify-center">
                  <RankGlyph rank={currentRank} size="lg" />
                </div>
              </div>

              <h2
                className="text-3xl font-black mb-1"
                style={{ color: currentRank.color }}
              >
                {rankName(currentRank)}
              </h2>
              <p className="text-gray-400 text-sm mb-3 lowercase tracking-wide">
                {t(`ranks.taglines.${currentRank.key}` as TranslationKey)}
              </p>

              {nextRank ? (
                <p className="text-gray-600 text-sm">
                  {t("ranks.moreToNext", {
                    count: nextRank.min - userProgress.placesVisited,
                  })}{" "}
                  <span className="font-bold" style={{ color: nextRank.color }}>
                    {rankName(nextRank)}
                  </span>
                </p>
              ) : (
                <p className="text-gray-600 text-sm font-bold">
                  {t("ranks.reachedTop")}
                </p>
              )}
            </div>

            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              {t("ranks.cityPassport")}
            </h3>
            <div className="space-y-2.5 mb-6">
              <PassportStat
                icon={<MapIcon className="w-5 h-5 text-violet-600" />}
                bg="bg-violet-100"
                label={t("ranks.placesVisited")}
                value={userProgress.placesVisited}
              />
              {userProgress.districts > 0 && (
                <PassportStat
                  icon={<span className="text-lg">🗺️</span>}
                  bg="bg-lime-100"
                  label={t("ranks.districtsUnlocked")}
                  value={userProgress.districts}
                />
              )}
            </div>

            {hasAchievements && (
              <>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  {t("ranks.achievements")}
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {userProgress.isNightExplorer && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full">
                      <MoonIcon className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm font-bold text-indigo-900">
                        {t("ranks.nightExplorer")}
                      </span>
                    </div>
                  )}
                  {userProgress.isFoodHunter && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full">
                      <UtensilsIcon className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-bold text-orange-900">
                        {t("ranks.foodHunter")}
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function PassportStat({
  icon,
  bg,
  label,
  value,
}: {
  icon: React.ReactNode;
  bg: string;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-2xl">
      <div
        className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center shrink-0`}
      >
        {icon}
      </div>
      <div className="flex-1 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-xl font-black text-gray-900">{value}</p>
      </div>
    </div>
  );
}
