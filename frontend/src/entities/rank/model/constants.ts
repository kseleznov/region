import type { Rank, RankKey } from "./types";

export const RANKS: Rank[] = [
  { key: "wanderer", name: "Wanderer", tagline: "just starting out", min: 0, max: 5, color: "#C7D2FE" },
  { key: "explorer", name: "Explorer", tagline: "getting curious", min: 5, max: 15, color: "#cfff47" },
  { key: "insider", name: "Insider", tagline: "knows the spots", min: 15, max: 40, color: "#F9A8D4" },
  { key: "localSoul", name: "Local Soul", tagline: "almost a local", min: 40, max: 80, color: "#A78BFA" },
  { key: "cityHunter", name: "City Hunter", tagline: "an expert", min: 80, max: 150, color: "#FCD34D" },
  { key: "urbanLegend", name: ",", tagline: "pure elite", min: 150, max: Infinity, color: "#34D399" },
];

export const RANK_TEXT: Record<RankKey, string> = {
  wanderer: "W",
  explorer: "E",
  insider: "I",
  localSoul: "LS",
  cityHunter: "CH",
  urbanLegend: "UL",
};

export function getRank(places: number): Rank {
  return RANKS.find((r) => places >= r.min && places < r.max) || RANKS[0];
}

export function getNextRank(currentKey: RankKey): Rank | null {
  const i = RANKS.findIndex((r) => r.key === currentKey);
  return RANKS[i + 1] || null;
}
