import type { ICard } from "@/shared/types/card";
import type { PlacesQuery } from "@/entities/place";
import type { TranslationKey } from "@/shared/i18n";

export interface CardSliderProps {
  /** i18n key for the section heading. Defaults to `overview.whereToGo`. */
  titleKey?: TranslationKey;
  /** Filter passed to `GET /places` — e.g. `{ kind: "food" }`. */
  query?: PlacesQuery;
  initialCards: ICard[];
}
