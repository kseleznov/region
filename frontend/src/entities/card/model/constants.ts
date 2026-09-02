import { IWorkingHours } from "@/shared/types/card";
import type { TranslationKey } from "@/shared/i18n";

export const DAYS: [keyof IWorkingHours, TranslationKey][] = [
  ["mon", "card.days.mon"],
  ["tue", "card.days.tue"],
  ["wed", "card.days.wed"],
  ["thu", "card.days.thu"],
  ["fri", "card.days.fri"],
  ["sat", "card.days.sat"],
  ["sun", "card.days.sun"],
];

export const TODAY_KEY = (
  ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as (keyof IWorkingHours)[]
)[new Date().getDay()];
