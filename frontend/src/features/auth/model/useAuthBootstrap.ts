"use client";

import { useEffect } from "react";
import { authApi } from "../api/authApi";
import { useAuthStore } from "./useAuthStore";
import { setSessionExpiredHandler } from "@/shared/api/axios";

/**
 * App-startup auth wiring — called once from `app/providers.tsx`:
 *
 * - probes `/auth/me` to restore the session into the store on load; a
 *   logged-out visitor just stays a guest, nothing redirects;
 * - points the axios interceptor's "session expired" hook at `clearUser`, so
 *   a session that dies mid-session flips the UI back to its guest state
 *   instead of leaving stale user data around.
 */
export function useAuthBootstrap() {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const markReady = useAuthStore((state) => state.markReady);

  useEffect(() => {
    setSessionExpiredHandler(clearUser);

    authApi
      .me()
      .then(({ data }) => setUser(data))
      .catch(() => {})
      .finally(markReady);
  }, [setUser, clearUser, markReady]);
}
