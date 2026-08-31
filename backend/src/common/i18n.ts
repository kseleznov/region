/**
 * Supported content locales. Kept as a plain string union (not a Prisma enum)
 * so adding a language is a data change, not a migration.
 */
export const LOCALES = ['en', 'ru'] as const;
export type Locale = (typeof LOCALES)[number];

/** Fallback locale — used when a request omits `lang` or asks for one we
 *  don't have a translation row for. */
export const DEFAULT_LOCALE: Locale = 'en';

export function isLocale(value: unknown): value is Locale {
  return (
    typeof value === 'string' && (LOCALES as readonly string[]).includes(value)
  );
}

/** Coerce an arbitrary `?lang=` value to a known locale. */
export function parseLocale(value?: string): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/**
 * Locales to fetch for a request: the wanted one plus the default as a
 * fallback, so `pickTranslation` always has something to return.
 */
export function localeCandidates(locale: Locale): Locale[] {
  return locale === DEFAULT_LOCALE ? [locale] : [locale, DEFAULT_LOCALE];
}

/**
 * Choose the best translation row: exact locale, then the default locale,
 * then whatever exists. Callers seed every place/city in every locale, so in
 * practice the first branch always hits.
 */
export function pickTranslation<T extends { locale: string }>(
  translations: T[],
  locale: Locale,
): T {
  return (
    translations.find((row) => row.locale === locale) ??
    translations.find((row) => row.locale === DEFAULT_LOCALE) ??
    translations[0]
  );
}
