import { MapPin, ExternalLink } from "lucide-react";

interface MiniMapProps {
  address?: string;
  lat?: number;
  lng?: number;
}

export function MiniMap({ address, lat, lng }: MiniMapProps) {
  const handleOpen = () => {
    if (lat && lng) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
        "_blank",
      );
    } else if (address) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
        "_blank",
      );
    }
  };

  return (
    <button
      onClick={handleOpen}
      className="relative w-full h-32 rounded-2xl overflow-hidden bg-brand-purple/10 border border-brand-purple/20 cursor-pointer group text-left"
    >
      <svg
        viewBox="0 0 400 200"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="minimap-grid"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#AC8CFF"
              strokeOpacity="0.15"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="400" height="200" fill="#F4EEFF" />
        <rect width="400" height="200" fill="url(#minimap-grid)" />

        {/* Roads */}
        <path
          d="M 0 80 Q 100 60 200 90 T 400 70"
          stroke="#AC8CFF"
          strokeOpacity="0.4"
          strokeWidth="6"
          fill="none"
        />
        <path
          d="M 0 140 Q 120 130 250 150 T 400 130"
          stroke="#AC8CFF"
          strokeOpacity="0.3"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M 120 0 Q 140 60 150 100 T 180 200"
          stroke="#AC8CFF"
          strokeOpacity="0.25"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M 280 0 Q 270 80 300 120 T 320 200"
          stroke="#AC8CFF"
          strokeOpacity="0.25"
          strokeWidth="3"
          fill="none"
        />

        <ellipse
          cx="80"
          cy="160"
          rx="40"
          ry="20"
          fill="#CFFF47"
          fillOpacity="0.5"
        />

        <ellipse
          cx="340"
          cy="40"
          rx="50"
          ry="25"
          fill="#AC8CFF"
          fillOpacity="0.25"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <span className="absolute inset-0 rounded-full bg-dark/20 animate-ping" />
          <div className="relative w-10 h-10 rounded-full bg-dark flex items-center justify-center shadow-lg">
            <MapPin
              className="w-5 h-5 text-brand-yellow"
              strokeWidth={2.5}
              fill="currentColor"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 right-2 bg-light/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-sm group-hover:bg-brand-yellow transition-colors">
        <ExternalLink className="w-3.5 h-3.5 text-dark" strokeWidth={2.5} />
        <span className="text-[11px] font-bold text-dark">Open in Maps</span>
      </div>

      {address && (
        <div className="absolute bottom-2 left-2 right-32 truncate text-[11px] font-medium text-dark/70 bg-light/80 backdrop-blur-sm rounded-full px-3 py-1.5">
          {address}
        </div>
      )}
    </button>
  );
}
