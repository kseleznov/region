import type { Rank } from "../model/types";

interface RankGlyphProps {
  rank: Rank;
  size?: "sm" | "lg";
  color?: string;
}

/**
 * RANK GLYPHS — each rank gets a unique animated SVG.
 * Flat, neon, soft-minimal geo / orbit / radar motifs on a 100×100 viewBox.
 * Only rotationally neutral shapes spin — no letterforms, so nothing ever
 * reads mirrored mid-animation.
 */
export function RankGlyph({ rank, size = "sm", color }: RankGlyphProps) {
  const stroke = size === "sm" ? 5 : 4;
  const dot = size === "sm" ? 7 : 6;
  const c = color ?? rank.color;
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
