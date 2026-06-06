import { useState } from "react";
import { getRank, getNextRank } from "./constants";
import type { UserProgress } from "./types";

export function useRankBadge(userProgress: UserProgress) {
  const [isOpen, setIsOpen] = useState(false);
  const currentRank = getRank(userProgress.placesVisited);
  const nextRank = getNextRank(currentRank.key);
  const progress = nextRank
    ? ((userProgress.placesVisited - currentRank.min) /
        (nextRank.min - currentRank.min)) *
      100
    : 100;

  return { isOpen, setIsOpen, currentRank, nextRank, progress };
}
