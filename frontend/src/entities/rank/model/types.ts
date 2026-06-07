export type RankKey =
  | "wanderer"
  | "explorer"
  | "insider"
  | "localSoul"
  | "cityHunter"
  | "urbanLegend";

export interface Rank {
  key: RankKey;
  name: string;
  tagline: string;
  min: number;
  max: number;
  color: string;
}

export interface UserProgress {
  placesVisited: number;
  districts: number;
  isNightExplorer: boolean;
  isFoodHunter: boolean;
}

export interface RankBadgeProps {
  userProgress: UserProgress;
}
