import { TODAY_KEY } from "./constants";
import { useEffect, useState } from "react";
import type { UseCardProps } from "./types";

export function useCard({ card }: UseCardProps) {
  const [hoursOpen, setHoursOpen] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const photos =
    card.photos && card.photos.length > 0 ? card.photos : [card.image];
  const isLongDesc = (card.description?.length ?? 0) > 140;

  const todayHours = card.workingHours?.[TODAY_KEY];
  const closingTime = todayHours?.includes("–")
    ? todayHours.split("–")[1]?.split(",")[0]
    : null;

  return {
    hoursOpen,
    setHoursOpen,
    descExpanded,
    setDescExpanded,
    photos,
    isLongDesc,
    closingTime,
  };
}
