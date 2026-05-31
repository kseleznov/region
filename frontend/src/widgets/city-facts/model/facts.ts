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

export const lisbonFacts: Fact[] = [
  {
    type: "stat",
    value: "3 000+",
    label: "лет истории",
    color: "bg-brand-yellow",
    textColor: "text-dark",
  },
  {
    type: "text",
    text: "Лиссабон — единственная западноевропейская столица к западу от Лондона.",
    color: "bg-brand-purple",
    textColor: "text-light",
  },
  {
    type: "photo",
    url: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGLAbaIeXI9zvmuPpP1sJ6R8ML3fN-HjO0lmM5EgFMgpBrOKATYdM7OGxEqUkz6oyPp_myMVIRfmQW-wIKSrsV2EC4HU3VA1uqV0KsNzfWYLiyZPXzpCj8KqOAbJB04LCBE2Xtk=w1080-h624-n-k-no",
    caption: "Башня Белен, XV век",
  },
  {
    type: "stat",
    value: "7",
    label: "холмов города",
    color: "bg-brand-pink",
    textColor: "text-dark",
  },
  {
    type: "text",
    text: "Трамвай №28, запущенный в 1914 году, до сих пор курсирует по историческим районам.",
    color: "bg-brand-green",
    textColor: "text-dark",
  },
  {
    type: "photo",
    url: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEXy4TyO2OV1sPh3Np7NwFyvA1pKevJebp5MiWdnaJE6unQifVLQ3VJSyokKAsiMjgO8wDfB9DGcfLS3i6j45mAeGoHh3E_e6ouxrR_V5ymHJFc7_oXA2g1kA5YoURLd8KC1A5n=w1080-h624-n-k-no",
    caption: "Замок Св. Георгия",
  },
  {
    type: "stat",
    value: "900 км",
    label: "береговой линии",
    color: "bg-brand-yellow",
    textColor: "text-dark",
  },
  {
    type: "text",
    text: "На португальском языке говорят более 250 млн человек по всему миру.",
    color: "bg-brand-purple",
    textColor: "text-light",
  },
];
