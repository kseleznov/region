"use client";

import { useCallback } from "react";
import { useTranslation, type TranslationKey } from "@/shared/i18n";

/**
 * City names are stored in their English form (they double as the slug and
 * the selection key). This resolves one to a label for the active locale,
 * falling back to the raw name when there's no dictionary entry.
 */
export function useCityName(): (raw: string | null | undefined) => string {
  const { t } = useTranslation();

  return useCallback(
    (raw) => {
      if (!raw) {
        return "";
      }
      const key = `staticCities.${raw.toLowerCase()}` as TranslationKey;
      const label = t(key);
      return label === key ? raw : label;
    },
    [t],
  );
}
