import { ICard } from "@/shared/types/card";
import { TODAY_KEY } from "./constants";
import { useEffect, useState } from "react";

interface CardDetailProps {
  card: ICard;
}

export function useCard({ card }: CardDetailProps) {
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
