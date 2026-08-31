"use client";

import { SearchX } from "lucide-react";
import { useTranslation } from "@/shared/i18n";

interface EmptyPlacesProps {
  hasActiveFilters: boolean;
  onResetFilters: () => void;
}

/** Shown inside a category section when it has no places to display. */
export function EmptyPlaces({
  hasActiveFilters,
  onResetFilters,
}: EmptyPlacesProps) {
  const { t } = useTranslation();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
        <SearchX className="h-6 w-6 text-brand-gray" />
      </div>
      <p className="text-lg font-bold text-dark">
        {hasActiveFilters
          ? t("explore.empty.filteredTitle")
          : t("explore.empty.emptyTitle")}
      </p>
      <p className="max-w-[280px] text-sm text-brand-gray">
        {hasActiveFilters
          ? t("explore.empty.filteredHint")
          : t("explore.empty.emptyHint")}
      </p>
      {hasActiveFilters && (
        <button
          onClick={onResetFilters}
          className="mt-1 rounded-full bg-dark px-5 py-2.5 text-sm font-bold text-white"
        >
          {t("explore.filters.reset")}
        </button>
      )}
    </div>
  );
}
