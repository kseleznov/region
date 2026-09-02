import { en } from "./locales/en";
import { ru } from "./locales/ru";
import type { Locale } from "./config";

/** The English tree defines the required shape for every other locale. */
export type Dictionary = typeof en;

export const dictionaries: Record<Locale, Dictionary> = { en, ru };
