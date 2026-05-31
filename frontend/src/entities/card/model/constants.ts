import { IWorkingHours } from "@/shared/types/card";

export const DAYS: [keyof IWorkingHours, string][] = [
  ["mon", "Mon"],
  ["tue", "Tue"],
  ["wed", "Wed"],
  ["thu", "Thu"],
  ["fri", "Fri"],
  ["sat", "Sat"],
  ["sun", "Sun"],
] as const;

export const TODAY_KEY = (
  ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as (keyof IWorkingHours)[]
)[new Date().getDay()];
