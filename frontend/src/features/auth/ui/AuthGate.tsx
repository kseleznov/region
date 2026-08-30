"use client";

import type { ReactNode } from "react";
import { useAuthStore } from "../model/useAuthStore";

interface AuthGateProps {
  children: ReactNode;
  /** Rendered instead of `children` when the visitor is a guest. */
  fallback: ReactNode;
}

/**
 * Guards a page's content behind a logged-in session. While the startup
 * `/auth/me` probe is still in flight nothing is rendered, so a logged-in
 * user never flashes the `fallback` before their session is restored.
 */
export function AuthGate({ children, fallback }: AuthGateProps) {
  const user = useAuthStore((state) => state.user);
  const isReady = useAuthStore((state) => state.isReady);

  if (!isReady) {
    return null;
  }

  return <>{user ? children : fallback}</>;
}
