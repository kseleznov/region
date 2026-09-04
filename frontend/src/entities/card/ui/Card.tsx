"use client";

import Image from "next/image";
import { Clock, Heart, MapPin, MapPinCheck, Wallet } from "lucide-react";
import { StarRating } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";
import { useCategoryLabel, useTranslation } from "@/shared/i18n";
import type { CardProps } from "../model/types";

/** Circular chip for the saved / visited status icons — a dark scrim so the
 * icons stay readable on bright cover images. */
const STATUS_BADGE_CLASS =
  "w-10 h-10 rounded-full flex items-center justify-center bg-black/45 backdrop-blur-md ring-1 ring-white/15 shadow-lg";

export function Card({
  address,
  category,
  image,
  isOpen,
  isSaved,
  isVisited,
  name,
  price,
  stars,
  className,
  onClick,
}: CardProps) {
  const { t } = useTranslation();
  const categoryLabel = useCategoryLabel();

  return (
    <li
      onClick={onClick}
      className={cn(
        "relative rounded-3xl overflow-hidden w-[85vw] max-w-[340px] aspect-[3/4] flex-shrink-0 snap-start cursor-pointer",
        className,
      )}
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={name}
          fill
          sizes="85vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {(isSaved || isVisited) && (
        <div className="absolute top-4 right-4 flex flex-col gap-2 pointer-events-none">
          {isSaved && (
            <div className={STATUS_BADGE_CLASS}>
              <Heart
                size={18}
                className="fill-brand-pink text-brand-pink drop-shadow-sm"
              />
            </div>
          )}
          {isVisited && (
            <div className={STATUS_BADGE_CLASS}>
              <MapPinCheck
                size={18}
                strokeWidth={2.5}
                className="text-brand-green drop-shadow-sm"
              />
            </div>
          )}
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-2">
        <div className="self-start bg-brand-yellow text-dark text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
          {categoryLabel(category)}
        </div>

        <h2 className="text-white text-3xl font-bold leading-tight">{name}</h2>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-white text-sm">
            <StarRating rating={stars} />
            <span className="font-medium">{stars}</span>
          </div>

          <div className="flex items-center gap-1.5 text-white text-sm font-medium">
            <Wallet size={14} className="flex-shrink-0 text-white/70" />
            <span>
              {price > 0 ? t("common.from", { price }) : t("common.free")}
            </span>
          </div>

          <div
            className={`flex items-center gap-1.5 text-sm font-medium ${isOpen ? "text-brand-yellow" : "text-brand-pink"}`}
          >
            <Clock size={14} className="flex-shrink-0" />
            <span>{isOpen ? t("common.open") : t("common.closed")}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-white/60 text-xs">
          <MapPin size={12} className="flex-shrink-0" />
          <span className="truncate">{address}</span>
        </div>
      </div>
    </li>
  );
}
