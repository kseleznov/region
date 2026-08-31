"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  type Locale,
} from "./config";

interface LocaleContextValue {
  locale: Locale;
  /** Switch the whole app: persist to the cookie, re-render every consumer,
   *  refetch locale-scoped queries and re-run server components. */
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function writeCookieLocale(locale: Locale): void {
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=${LOCALE_COOKIE_MAX_AGE};samesite=lax`;
}

interface LocaleProviderProps {
  /** Locale resolved from the cookie on the server, so SSR output and the
   *  first client render agree. */
  initialLocale: Locale;
  children: React.ReactNode;
}

export function LocaleProvider({
  initialLocale,
  children,
}: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const router = useRouter();
  const queryClient = useQueryClient();

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState((current) => {
        if (current === next) {
          return current;
        }
        writeCookieLocale(next);
        void queryClient.invalidateQueries();
        router.refresh();
        return next;
      });
    },
    [queryClient, router],
  );

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  return useContext(LocaleContext)?.locale ?? DEFAULT_LOCALE;
}

export function useSetLocale(): (locale: Locale) => void {
  const ctx = useContext(LocaleContext);
  return ctx?.setLocale ?? (() => {});
}
