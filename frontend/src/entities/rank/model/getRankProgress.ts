import { getNextRank, getRank } from "./constants";
import type { Rank } from "./types";

export interface RankProgress {
  currentRank: Rank;
  /** The rank after `currentRank`, or `null` when already at the top. */
  nextRank: Rank | null;
  /** 0–100 — how far into `currentRank` the visitor has progressed. */
  progressPercent: number;
  /** Places still needed to reach `nextRank`; 0 at the top rank. */
  placesToNextRank: number;
}

/** Derive the current rank and progress toward the next one from a place count. */
export function getRankProgress(placesVisited: number): RankProgress {
  const currentRank = getRank(placesVisited);
  const nextRank = getNextRank(currentRank.key);

  const progressPercent = nextRank
    ? Math.min(
        100,
        Math.max(
          0,
          ((placesVisited - currentRank.min) /
            (nextRank.min - currentRank.min)) *
            100,
        ),
      )
    : 100;

  const placesToNextRank = nextRank
    ? Math.max(0, nextRank.min - placesVisited)
    : 0;

  return { currentRank, nextRank, progressPercent, placesToNextRank };
}
