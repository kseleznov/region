"use client";

import { useCallback } from "react";
import { useLocale } from "./LocaleProvider";
import { dictionaries } from "./dictionaries";
import {
  translate,
  type TranslationKey,
  type TranslationVars,
} from "./translate";
import type { Locale } from "./config";

export interface UseTranslation {
  /** Active content locale. */
  locale: Locale;
  /** Look up a dotted key in the active locale's dictionary. */
  t: (key: TranslationKey, vars?: TranslationVars) => string;
}

export function useTranslation(): UseTranslation {
  const locale = useLocale();

  const t = useCallback(
    (key: TranslationKey, vars?: TranslationVars) =>
      translate(dictionaries[locale], key, vars),
    [locale],
  );

  return { locale, t };
}
