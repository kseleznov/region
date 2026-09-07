import { TODAY_KEY } from "./constants";
import { useEffect, useState } from "react";
import { shareContent } from "@/shared/lib/share";
import type { UseCardProps } from "./types";

export function useCard({ card }: UseCardProps) {
  const [hoursOpen, setHoursOpen] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [tipSheetOpen, setTipSheetOpen] = useState(false);

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

  const handleShare = () => {
    const text = card.address ? `${card.name} — ${card.address}` : card.name;
    return shareContent({
      title: card.name,
      text,
      url: window.location.href,
    });
  };

  return {
    hoursOpen,
    setHoursOpen,
    descExpanded,
    setDescExpanded,
    shareMenuOpen,
    setShareMenuOpen,
    tipSheetOpen,
    setTipSheetOpen,
    photos,
    isLongDesc,
    closingTime,
    handleShare,
  };
}
