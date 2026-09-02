export const LOCALES = ["en", "ru"] as const;

export type Locale = (typeof LOCALES)[number];

/** Falls back to this when no cookie is set or the value is unknown. */
export const DEFAULT_LOCALE: Locale = "en";

/** Cookie the locale is persisted in — read on the server (RSC) and the
 *  client, so SSR and hydration agree on the language. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** One year, in seconds. */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** Native name of each language, for the language picker. */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
};

export function isLocale(value: unknown): value is Locale {
  return (
    typeof value === "string" && (LOCALES as readonly string[]).includes(value)
  );
}
