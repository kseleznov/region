import { TODAY_KEY } from "./constants";
import { useEffect, useState } from "react";
import type { UseCardProps } from "./types";

export function useCard({ card }: UseCardProps) {
  const [hoursOpen, setHoursOpen] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const [expanded, setExpanded] = useState(false);
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

  const handleShare = async () => {
    if (typeof window === "undefined") return;

    const url = window.location.href;
    const text = card.address ? `${card.name} — ${card.address}` : card.name;

    try {
      if (navigator.share) {
        await navigator.share({ title: card.name, text, url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${text}\n${url}`);
      }
    } catch {
      // Share sheet dismissed or unavailable — nothing to do.
    }
  };

  return {
    hoursOpen,
    setHoursOpen,
    descExpanded,
    setDescExpanded,
    expanded,
    setExpanded,
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
