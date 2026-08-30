import { cn } from "@/shared/lib/cn";
import type { SavedTab } from "../model/useSaved";

interface SavedTabsProps {
  tab: SavedTab;
  savedCount: number;
  visitedCount: number;
  onChange: (tab: SavedTab) => void;
}

const TABS: { id: SavedTab; label: string }[] = [
  { id: "saved", label: "Saved" },
  { id: "visited", label: "Visited" },
];

export function SavedTabs({
  tab,
  savedCount,
  visitedCount,
  onChange,
}: SavedTabsProps) {
  const counts: Record<SavedTab, number> = {
    saved: savedCount,
    visited: visitedCount,
  };

  return (
    <div className="flex bg-search-bg rounded-full p-1">
      {TABS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={cn(
            "flex-1 py-2.5 rounded-full text-sm font-bold transition-colors",
            tab === id ? "bg-brand-purple text-white" : "text-brand-gray",
          )}
        >
          {label}
          <span
            className={cn(
              "ml-1.5 text-xs font-semibold",
              tab === id ? "text-white/70" : "text-brand-gray/60",
            )}
          >
            {counts[id]}
          </span>
        </button>
      ))}
    </div>
  );
}
