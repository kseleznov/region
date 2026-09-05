import { useState } from "react";
import { getRankProgress } from "./getRankProgress";
import type { UserProgress } from "./types";

export function useRankBadge(userProgress: UserProgress) {
  const [isOpen, setIsOpen] = useState(false);
  const { currentRank, progressPercent } = getRankProgress(
    userProgress.placesVisited,
  );

  return {
    isOpen,
    setIsOpen,
    currentRank,
    progress: progressPercent,
  };
}
