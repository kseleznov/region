import type { useTranslation } from "@/shared/i18n";

export type StatFact = {
  type: "stat";
  value: string;
  label: string;
  color: string;
  textColor: string;
};

export type TextFact = {
  type: "text";
  text: string;
  color: string;
  textColor: string;
};

export type PhotoFact = {
  type: "photo";
  url: string;
  caption: string;
};

export type Fact = StatFact | TextFact | PhotoFact;

type Translate = ReturnType<typeof useTranslation>["t"];

/** Lisbon trivia for the "Did you know?" carousel, in the active locale. */
export function buildLisbonFacts(t: Translate): Fact[] {
  return [
    {
      type: "stat",
      value: t("cityFacts.lisbon.yearsHistoryValue"),
      label: t("cityFacts.lisbon.yearsHistoryLabel"),
      color: "bg-brand-yellow",
      textColor: "text-dark",
    },
    {
      type: "text",
      text: t("cityFacts.lisbon.westernmostCapital"),
      color: "bg-brand-purple",
      textColor: "text-light",
    },
    {
      type: "photo",
      url: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGLAbaIeXI9zvmuPpP1sJ6R8ML3fN-HjO0lmM5EgFMgpBrOKATYdM7OGxEqUkz6oyPp_myMVIRfmQW-wIKSrsV2EC4HU3VA1uqV0KsNzfWYLiyZPXzpCj8KqOAbJB04LCBE2Xtk=w1080-h624-n-k-no",
      caption: t("cityFacts.lisbon.belemCaption"),
    },
    {
      type: "stat",
      value: t("cityFacts.lisbon.hillsValue"),
      label: t("cityFacts.lisbon.hillsLabel"),
      color: "bg-brand-pink",
      textColor: "text-dark",
    },
    {
      type: "text",
      text: t("cityFacts.lisbon.tram"),
      color: "bg-brand-green",
      textColor: "text-dark",
    },
    {
      type: "photo",
      url: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEXy4TyO2OV1sPh3Np7NwFyvA1pKevJebp5MiWdnaJE6unQifVLQ3VJSyokKAsiMjgO8wDfB9DGcfLS3i6j45mAeGoHh3E_e6ouxrR_V5ymHJFc7_oXA2g1kA5YoURLd8KC1A5n=w1080-h624-n-k-no",
      caption: t("cityFacts.lisbon.castleCaption"),
    },
    {
      type: "stat",
      value: t("cityFacts.lisbon.coastlineValue"),
      label: t("cityFacts.lisbon.coastlineLabel"),
      color: "bg-brand-yellow",
      textColor: "text-dark",
    },
    {
      type: "text",
      text: t("cityFacts.lisbon.portuguese"),
      color: "bg-brand-purple",
      textColor: "text-light",
    },
  ];
}
