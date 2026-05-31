"use client";

import Image from "next/image";
import { Heart, MapPin } from "lucide-react";
import { StarRating } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";
import type { ICard } from "@/shared/types/card";

interface CardProps extends ICard {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
}

export function Card({
  address,
  category,
  image,
  isOpen,
  isSaved,
  name,
  price,
  stars,
  className,
  onClick,
}: CardProps) {
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

      <button
        onClick={(event) => event.stopPropagation()}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
      >
        <Heart
          size={18}
          className={isSaved ? "fill-brand-pink text-brand-pink" : "text-white"}
        />
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-2">
        <div className="self-start bg-brand-yellow text-dark text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
          {category}
        </div>

        <h2 className="text-white text-3xl font-bold leading-tight">{name}</h2>

        <div className="flex items-center gap-2 flex-wrap">
          <StarRating rating={stars} />
          <span className="text-white font-medium text-sm">{stars}</span>

          <span className="text-white/40">•</span>

          <div className="flex items-center gap-1 text-white text-sm">
            <span>{price > 0 ? `from ${price}€` : "Free"}</span>
          </div>

          <span className="text-white/40">•</span>

          <div className="flex items-center gap-1.5">
            <div
              className={`w-2 h-2 rounded-full ${isOpen ? "bg-brand-yellow" : "bg-brand-pink"}`}
            />
            <span
              className={`text-sm font-medium ${isOpen ? "text-brand-yellow" : "text-brand-pink"}`}
            >
              {isOpen ? "Open" : "Closed"}
            </span>
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
