import axios from "axios";

import { ROUTES } from "@/shared/config/routes";

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

/** True while a token refresh request is in flight. */
let isRefreshing = false;

/**
 * Queue of requests that arrived while a refresh was in progress.
 * Each entry is a callback that receives the refresh outcome:
 * null on success (request will be retried) or an error on failure.
 */
let failedQueue: Array<(err: unknown) => void> = [];

/**
 * Resolves or rejects every queued request based on the refresh outcome,
 * then empties the queue.
 *
 * @param err - null if the refresh succeeded; the refresh error otherwise.
 */
function flushQueue(err: unknown) {
  failedQueue.forEach((cb) => cb(err));
  failedQueue = [];
}

/**
 * Navigates the user to the sign-in page.
 * The `typeof window` guard prevents this from running during SSR.
 */
function redirectToSignIn() {
  if (typeof window !== "undefined") {
    window.location.href = ROUTES.signIn;
  }
}

/**
 * Response interceptor that transparently refreshes the access token on 401.
 *
 * Flow:
 * 1. Any 401 that hasn't been retried yet triggers a token refresh.
 * 2. Requests that arrive while a refresh is already in flight are queued.
 * 3. On successful refresh — flush the queue and retry the original request.
 * 4. On failed refresh — reject the entire queue and redirect to sign-in.
 */
apiClient.interceptors.response.use(undefined, async (error) => {
  const originalRequest = error.config;

  // Skip: not a 401, or the request already went through a retry (prevents infinite loops)
  if (error.response?.status !== 401 || originalRequest._retry) {
    return Promise.reject(error);
  }

  // A refresh is already running — queue this request and wait for the outcome
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push((err) => {
        if (err) reject(err);
        else resolve(apiClient(originalRequest));
      });
    });
  }

  // Mark the request as retried so it won't trigger another refresh cycle
  originalRequest._retry = true;
  isRefreshing = true;

  try {
    await apiClient.post("/auth/refresh");
    flushQueue(null);
    return apiClient(originalRequest);
  } catch (refreshError) {
    flushQueue(refreshError);
    redirectToSignIn();
    return Promise.reject(refreshError);
  } finally {
    isRefreshing = false;
  }
});
