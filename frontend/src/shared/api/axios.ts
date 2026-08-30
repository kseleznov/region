import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

/**
 * Base HTTP client for the application.
 *
 * All API requests go through this instance — it automatically prepends
 * the base URL from the environment variable and sends cookies with every
 * request (required for the session and refresh token to work).
 */
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

/**
 * Endpoints where a 401 is the final answer (wrong credentials, invalid or
 * missing refresh token) — not a stale access token. Kicking off the silent
 * refresh-and-retry flow for these is pointless and, for login/register,
 * would swallow the real error the form needs to show.
 *
 * `/auth/refresh` doesn't need to be listed: axios-auth-refresh pauses the
 * instance while a refresh is in flight, so the refresh call's own response
 * is never re-intercepted.
 */
const AUTH_ENDPOINTS = ["/auth/login", "/auth/register"];

function isAuthEndpoint(url?: string) {
  return !!url && AUTH_ENDPOINTS.some((path) => url.startsWith(path));
}

let onSessionExpired: (() => void) | undefined;

/**
 * Register a callback fired when a 401 can't be recovered by a token refresh —
 * the session is gone for good. Kept as an injected handler so this layer
 * doesn't import from `features/*` (FSD: `shared` can't depend on `features`);
 * it's wired to the auth store in `features/auth`.
 *
 * Note: this only clears client state. Navigation is a UI concern — nothing
 * here redirects, so a logged-out visitor stays on whatever public page they
 * were on and the UI falls back to its guest state.
 */
export function setSessionExpiredHandler(handler: () => void) {
  onSessionExpired = handler;
}

/**
 * Transparently refreshes the access token on a 401.
 *
 * axios-auth-refresh pauses every other request on `apiClient` until this
 * promise settles: on success it replays the paused requests, on failure it
 * rejects the whole queue. A failed refresh means the session is gone, so we
 * let the registered handler clear client auth state.
 */
async function refreshAuth() {
  try {
    return await apiClient.post("/auth/refresh");
  } catch (refreshError) {
    onSessionExpired?.();
    throw refreshError;
  }
}

createAuthRefreshInterceptor(apiClient, refreshAuth, {
  // One refresh cycle per failed request — if the retry still 401s, surface it.
  maxRetries: 1,
  shouldRefresh: (error) =>
    error.response?.status === 401 &&
    !isAuthEndpoint(error.response?.config.url),
});
