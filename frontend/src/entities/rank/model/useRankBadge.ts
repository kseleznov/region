import { useEffect, useState } from "react";
import { getRankProgress } from "./getRankProgress";
import type { UserProgress } from "./types";

export function useRankBadge(userProgress: UserProgress) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  const { currentRank, nextRank, progressPercent } = getRankProgress(
    userProgress.placesVisited,
  );
  const hasAchievements =
    userProgress.isNightExplorer || userProgress.isFoodHunter;

  return {
    isOpen,
    setIsOpen,
    currentRank,
    nextRank,
    progress: progressPercent,
    hasAchievements,
  };
}
