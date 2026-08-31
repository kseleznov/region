"use client";

import { useState } from "react";
import { useLocaleStore } from "./store";
import type { Locale } from "./config";

interface LocaleProviderProps {
  /** Locale resolved from the cookie on the server, passed down from the
   *  root layout so SSR output and the first client render agree. */
  initialLocale: Locale;
  children: React.ReactNode;
}

/**
 * Seeds the locale store with the server-resolved locale before any child
 * reads it. `useState`'s initializer runs once, synchronously, on the first
 * render (server and client alike), so there is no hydration flash.
 */
export function LocaleProvider({
  initialLocale,
  children,
}: LocaleProviderProps) {
  useState(() => {
    useLocaleStore.getState().syncLocale(initialLocale);
    return null;
  });

  return children;
}
