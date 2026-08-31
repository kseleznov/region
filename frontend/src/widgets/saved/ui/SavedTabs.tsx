"use client";

import { cn } from "@/shared/lib/cn";
import { useTranslation, type TranslationKey } from "@/shared/i18n";
import type { SavedTab } from "../model/useSaved";

interface SavedTabsProps {
  tab: SavedTab;
  savedCount: number;
  visitedCount: number;
  onChange: (tab: SavedTab) => void;
}

const TABS: { id: SavedTab; labelKey: TranslationKey }[] = [
  { id: "saved", labelKey: "saved.tabs.saved" },
  { id: "visited", labelKey: "saved.tabs.visited" },
];

export function SavedTabs({
  tab,
  savedCount,
  visitedCount,
  onChange,
}: SavedTabsProps) {
  const { t } = useTranslation();
  const counts: Record<SavedTab, number> = {
    saved: savedCount,
    visited: visitedCount,
  };

  return (
    <div className="flex bg-search-bg rounded-full p-1">
      {TABS.map(({ id, labelKey }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={cn(
            "flex-1 py-2.5 rounded-full text-sm font-bold transition-colors",
            tab === id ? "bg-brand-purple text-white" : "text-brand-gray",
          )}
        >
          {t(labelKey)}
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
