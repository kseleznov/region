interface ProgressRingProps {
  progress: number;
  color: string;
  size: number;
  stroke: number;
}

export function ProgressRing({
  progress,
  color,
  size,
  stroke,
}: ProgressRingProps) {
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
