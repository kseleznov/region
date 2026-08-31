"use client";

import { useCallback } from "react";
import { useTranslation, type TranslationKey } from "@/shared/i18n";

/**
 * The API keeps category values language-neutral — parent ids (`culture`,
 * `nature`, …) and Russian subcategory strings (`Музей`) double as filter
 * keys. This hook turns either into a label for the active locale, falling
 * back to the raw value if there's no dictionary entry.
 */
export function useCategoryLabel(): (raw: string) => string {
  const { t } = useTranslation();

  return useCallback(
    (raw: string) => {
      const parentKey = `categories.parents.${raw}` as TranslationKey;
      const parentLabel = t(parentKey);
      if (parentLabel !== parentKey) {
        return parentLabel;
      }

      const subKey = `categories.sub.${raw}` as TranslationKey;
      const subLabel = t(subKey);
      return subLabel === subKey ? raw : subLabel;
    },
    [t],
  );
}
