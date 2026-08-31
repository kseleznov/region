import { create } from "zustand";
import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  type Locale,
} from "./config";

function readCookieLocale(): Locale {
  if (typeof document === "undefined") {
    return DEFAULT_LOCALE;
  }
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${LOCALE_COOKIE}=([^;]+)`),
  );
  return isLocale(match?.[1]) ? match[1] : DEFAULT_LOCALE;
}

function writeCookieLocale(locale: Locale): void {
  if (typeof document === "undefined") {
    return;
  }
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=${LOCALE_COOKIE_MAX_AGE};samesite=lax`;
}

interface LocaleStore {
  locale: Locale;
  /** Persist to the cookie and update state. UI side effects (refetching
   *  server data, invalidating queries) are wired up in `useSetLocale`. */
  setLocale: (locale: Locale) => void;
  /** Force the store to a specific locale without touching the cookie —
   *  used by `LocaleProvider` to seed the server-resolved locale. */
  syncLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleStore>((set) => ({
  locale: DEFAULT_LOCALE,
  setLocale: (locale) => {
    writeCookieLocale(locale);
    set({ locale });
  },
  syncLocale: (locale) =>
    set((state) => (state.locale === locale ? state : { locale })),
}));

export { readCookieLocale };
