"use client";

import React from "react";
import { X, MapIcon, MoonIcon, UtensilsIcon } from "lucide-react";
import { useRankBadge } from "../model/useRankBadge";
import type { Rank, RankBadgeProps } from "../model/types";

/**
 * RANK GLYPHS — each rank gets a unique animated SVG.
 * Flat, neon, soft-minimal geo / orbit / radar motifs on a 100×100 viewBox.
 * Only rotationally neutral shapes spin — no letterforms, so nothing ever
 * reads mirrored mid-animation.
 */
function RankGlyph({ rank, size = "sm" }: { rank: Rank; size?: "sm" | "lg" }) {
  const stroke = size === "sm" ? 5 : 4;
  const dot = size === "sm" ? 7 : 6;
  const c = rank.color;
  const glow = `drop-shadow(0 0 6px ${c}88)`;
  // Unique per rank + size so the header badge and the open panel (both on the
  // page at once, same rank) don't collide on SVG def ids.
  const uid = `${rank.key}-${size}`;

  switch (rank.key) {
    case "wanderer":
      // A single dot at center + one slow orbit ring — "just starting the journey".
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          style={{ filter: glow }}
        >
          <g className="rb-spin-slow" style={{ transformOrigin: "50px 50px" }}>
            <circle
              cx="50"
              cy="50"
              r="28"
              fill="none"
              stroke={c}
              strokeWidth={stroke / 1.5}
              strokeDasharray="2 6"
              opacity="0.6"
            />
            <circle cx="78" cy="50" r={dot - 1} fill={c} />
          </g>
          <circle cx="50" cy="50" r="6" fill={c} />
        </svg>
      );

    case "explorer":
      // Compass needle rotating slowly — the wanderer who picked a direction.
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          style={{ filter: glow }}
        >
          <circle
            cx="50"
            cy="50"
            r="34"
            fill="none"
            stroke={c}
            strokeWidth={stroke / 1.8}
            opacity="0.5"
          />
          <g
            className="rb-spin-medium"
            style={{ transformOrigin: "50px 50px" }}
          >
            <polygon points="50,18 56,50 50,46 44,50" fill={c} />
            <polygon points="50,82 56,50 50,54 44,50" fill={c} opacity="0.35" />
          </g>
          <circle cx="50" cy="50" r="4" fill={c} />
        </svg>
      );

    case "insider":
      // Radar sweep — a rotating wedge over a static grid. "Knows the spots".
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          style={{ filter: glow }}
        >
          <defs>
            <mask id={`rb-radar-mask-${uid}`}>
              <rect width="100" height="100" fill="black" />
              <circle cx="50" cy="50" r="38" fill="white" />
            </mask>
            <linearGradient id={`rb-sweep-${uid}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={c} stopOpacity="0" />
              <stop offset="100%" stopColor={c} stopOpacity="0.75" />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke={c}
            strokeWidth={stroke / 2}
            opacity="0.5"
          />
          <circle
            cx="50"
            cy="50"
            r="24"
            fill="none"
            stroke={c}
            strokeWidth={stroke / 2.5}
            opacity="0.35"
          />
          <circle
            cx="50"
            cy="50"
            r="10"
            fill="none"
            stroke={c}
            strokeWidth={stroke / 2.5}
            opacity="0.35"
          />
          <g mask={`url(#rb-radar-mask-${uid})`}>
            <g
              className="rb-spin-fast"
              style={{ transformOrigin: "50px 50px" }}
            >
              <path
                d="M50 50 L50 12 A38 38 0 0 1 88 50 Z"
                fill={`url(#rb-sweep-${uid})`}
              />
            </g>
          </g>
          <circle cx="50" cy="50" r="4" fill={c} />
        </svg>
      );

    case "localSoul":
      // Concentric pulsing rings, like a heartbeat on the map. "Almost a local".
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          style={{ filter: glow }}
        >
          <circle
            cx="50"
            cy="50"
            r="14"
            fill="none"
            stroke={c}
            strokeWidth={stroke / 1.4}
            className="rb-pulse-a"
          />
          <circle
            cx="50"
            cy="50"
            r="22"
            fill="none"
            stroke={c}
            strokeWidth={stroke / 1.6}
            className="rb-pulse-b"
            opacity="0.7"
          />
          <circle
            cx="50"
            cy="50"
            r="32"
            fill="none"
            stroke={c}
            strokeWidth={stroke / 1.8}
            className="rb-pulse-c"
            opacity="0.45"
          />
          <circle cx="50" cy="50" r="6" fill={c} />
        </svg>
      );

    case "cityHunter":
      // Counter-rotating diamond outlines — sharp and focused.
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          style={{ filter: glow }}
        >
          <g
            className="rb-spin-medium-rev"
            style={{ transformOrigin: "50px 50px" }}
          >
            <polygon
              points="50,12 88,50 50,88 12,50"
              fill="none"
              stroke={c}
              strokeWidth={stroke / 1.4}
              strokeLinejoin="round"
            />
          </g>
          <g
            className="rb-spin-medium"
            style={{ transformOrigin: "50px 50px" }}
          >
            <polygon
              points="50,26 74,50 50,74 26,50"
              fill="none"
              stroke={c}
              strokeWidth={stroke / 1.6}
              strokeLinejoin="round"
              opacity="0.6"
            />
          </g>
          <circle cx="50" cy="50" r="5" fill={c} />
        </svg>
      );

    case "urbanLegend":
      // Star burst with slowly rotating rays — the elite.
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          style={{ filter: glow }}
        >
          <g className="rb-spin-slow" style={{ transformOrigin: "50px 50px" }}>
            {[0, 45, 90, 135].map((deg) => (
              <line
                key={deg}
                x1="50"
                y1="14"
                x2="50"
                y2="86"
                stroke={c}
                strokeWidth={stroke / 1.5}
                strokeLinecap="round"
                transform={`rotate(${deg} 50 50)`}
                opacity={deg % 90 === 0 ? 1 : 0.55}
              />
            ))}
          </g>
          <circle cx="50" cy="50" r="14" fill={c} />
          <circle
            cx="50"
            cy="50"
            r="22"
            fill="none"
            stroke={c}
            strokeWidth={stroke / 2}
            opacity="0.4"
            className="rb-pulse-a"
          />
        </svg>
      );
  }
}

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

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label={`Rank: ${currentRank.name}. Tap for details.`}
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
              aria-label="Close"
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
                {currentRank.name}
              </h2>
              <p className="text-gray-400 text-sm mb-3 lowercase tracking-wide">
                {currentRank.tagline}
              </p>

              {nextRank ? (
                <p className="text-gray-600 text-sm">
                  <span className="font-bold text-gray-900">
                    {nextRank.min - userProgress.placesVisited}
                  </span>{" "}
                  more places to{" "}
                  <span className="font-bold" style={{ color: nextRank.color }}>
                    {nextRank.name}
                  </span>
                </p>
              ) : (
                <p className="text-gray-600 text-sm font-bold">
                  Youve reached the top.
                </p>
              )}
            </div>

            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              City Passport
            </h3>
            <div className="space-y-2.5 mb-6">
              <PassportStat
                icon={<MapIcon className="w-5 h-5 text-violet-600" />}
                bg="bg-violet-100"
                label="Places visited"
                value={userProgress.placesVisited}
              />
              {userProgress.districts > 0 && (
                <PassportStat
                  icon={<span className="text-lg">🗺️</span>}
                  bg="bg-lime-100"
                  label="Districts unlocked"
                  value={userProgress.districts}
                />
              )}
            </div>

            {hasAchievements && (
              <>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Achievements
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {userProgress.isNightExplorer && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full">
                      <MoonIcon className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm font-bold text-indigo-900">
                        Night Explorer
                      </span>
                    </div>
                  )}
                  {userProgress.isFoodHunter && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full">
                      <UtensilsIcon className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-bold text-orange-900">
                        Food Hunter
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
