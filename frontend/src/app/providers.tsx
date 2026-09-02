"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthBootstrap } from "@/features/auth";
import { RankProgressProvider } from "@/features/visit-card";
import { LocaleProvider } from "@/shared/i18n";
import { ToastProvider } from "@/shared/ui";
import type { Locale } from "@/shared/i18n";

export function Providers({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  useAuthBootstrap();

  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider initialLocale={initialLocale}>
        <ToastProvider>
          <RankProgressProvider>{children}</RankProgressProvider>
        </ToastProvider>
      </LocaleProvider>
    </QueryClientProvider>
  );
}
