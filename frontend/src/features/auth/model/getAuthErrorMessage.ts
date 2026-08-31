import { isAxiosError } from "axios";
import type { TranslationKey } from "@/shared/i18n";
import type { AuthMode } from "./types";

/**
 * Maps a failed auth request to a dictionary key for a user-facing message.
 * Network / no-response errors get their own key so a dead backend doesn't
 * read as "wrong password".
 */
export function getAuthErrorMessage(
  err: unknown,
  mode: AuthMode,
): TranslationKey {
  if (!isAxiosError(err) || !err.response) {
    return "auth.errors.network";
  }

  const status = err.response.status;

  if (mode === "sign-in") {
    if (status === 401) {
      return "auth.errors.invalidCredentials";
    }

    if (status === 400) {
      return "auth.errors.invalidInput";
    }

    return "auth.errors.signInGeneric";
  }

  if (status === 409) {
    return "auth.errors.emailTaken";
  }

  if (status === 400) {
    return "auth.errors.weakPassword";
  }

  return "auth.errors.signUpGeneric";
}
