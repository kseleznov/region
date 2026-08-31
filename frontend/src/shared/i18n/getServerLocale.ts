import { cookies } from "next/headers";
import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE, type Locale } from "./config";

/**
 * Server-only. Reads the locale cookie inside a Server Component / route so
 * SSR renders in the visitor's language. Not exported from the package
 * barrel — importing `next/headers` into a client bundle is a build error.
 */
export async function getServerLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}
