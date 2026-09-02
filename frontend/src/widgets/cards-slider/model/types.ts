import type { ICard } from "@/shared/types/card";

export interface CardSliderProps {
  /** Section heading. Defaults to the "Where to go" label for the locale. */
  title?: string;
  initialCards: ICard[];
}
