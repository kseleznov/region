import { useEffect, useState } from "react";
import { getRank, getNextRank } from "./constants";
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

  const currentRank = getRank(userProgress.placesVisited);
  const nextRank = getNextRank(currentRank.key);
  const progress = nextRank
    ? ((userProgress.placesVisited - currentRank.min) /
        (nextRank.min - currentRank.min)) *
      100
    : 100;
  const hasAchievements =
    userProgress.isNightExplorer || userProgress.isFoodHunter;

  return {
    isOpen,
    setIsOpen,
    currentRank,
    nextRank,
    progress,
    hasAchievements,
  };
}
