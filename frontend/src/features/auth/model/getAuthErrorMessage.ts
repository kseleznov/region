import { isAxiosError } from "axios";
import type { AuthMode } from "./types";

/**
 * Maps a failed auth request to a user-facing message. Network / no-response
 * errors get their own message so a dead backend doesn't read as "wrong
 * password".
 */
export function getAuthErrorMessage(err: unknown, mode: AuthMode): string {
  if (!isAxiosError(err) || !err.response) {
    return "Can't reach the server. Check your connection and try again.";
  }

  const status = err.response.status;

  if (mode === "sign-in") {
    if (status === 401) {
      return "Incorrect email or password";
    }

    if (status === 400) {
      return "Enter a valid email and password";
    }

    return "Couldn't sign you in. Please try again.";
  }

  if (status === 409) {
    return "This email is already registered";
  }

  if (status === 400) {
    return "Check your details: password must be at least 6 characters";
  }

  return "Couldn't create your account. Please try again.";
}
