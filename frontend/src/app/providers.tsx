"use client";

import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { authApi, useAuthStore } from "@/features/auth";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    authApi
      .me()
      .then(({ data }) => setUser(data))
      .catch(() => {});
  }, [setUser]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
