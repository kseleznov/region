"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useLocaleStore } from "./store";
import type { Locale } from "./config";

/**
 * Returns a `setLocale` that switches the whole app:
 *  - persists the choice to the cookie and updates the store (instant UI text),
 *  - invalidates every query so locale-scoped data refetches,
 *  - refreshes the route so server components re-read the cookie.
 */
export function useSetLocale(): (locale: Locale) => void {
  const setLocale = useLocaleStore((state) => state.setLocale);
  const queryClient = useQueryClient();
  const router = useRouter();

  return useCallback(
    (locale: Locale) => {
      if (useLocaleStore.getState().locale === locale) {
        return;
      }
      setLocale(locale);
      void queryClient.invalidateQueries();
      router.refresh();
    },
    [setLocale, queryClient, router],
  );
}
