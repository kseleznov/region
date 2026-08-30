"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthBootstrap } from "@/features/auth";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  useAuthBootstrap();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
