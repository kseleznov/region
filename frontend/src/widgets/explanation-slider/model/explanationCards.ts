import type { TranslationKey } from "@/shared/i18n";

export const explanationCards = [
  { textKey: "explanation.createEvents", variant: "first" },
  { textKey: "explanation.findActivity", variant: "second" },
  { textKey: "explanation.buyTickets", variant: "third" },
  { textKey: "explanation.stayInformed", variant: "fourd" },
] as const satisfies ReadonlyArray<{
  textKey: TranslationKey;
  variant: string;
}>;
