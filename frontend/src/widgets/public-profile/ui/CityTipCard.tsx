import Image from "next/image";
import { useCategoryLabel } from "@/shared/i18n";
import type { CityTip } from "@/entities/user";

interface CityTipCardProps {
  tip: CityTip;
  onOpenPlace: (placeId: number, rect: DOMRect) => void;
}

export function CityTipCard({ tip, onOpenPlace }: CityTipCardProps) {
  const categoryLabel = useCategoryLabel();

  return (
    <li
      onClick={(event) =>
        onOpenPlace(tip.placeId, event.currentTarget.getBoundingClientRect())
      }
      className="w-44 flex-shrink-0 snap-start cursor-pointer active:scale-[0.98] transition-transform"
    >
      <div className="relative w-full h-32 rounded-2xl overflow-hidden mb-2">
        <Image
          src={tip.placeImage}
          alt={tip.placeName}
          fill
          sizes="176px"
          className="object-cover"
        />
        <span className="absolute top-2 left-2 inline-block max-w-[calc(100%-1rem)] truncate bg-white/95 backdrop-blur-sm text-dark text-[10px] font-extrabold uppercase tracking-wide px-2 py-1 rounded-full">
          {categoryLabel(tip.category)}
        </span>
      </div>
      <p className="text-sm font-bold text-dark truncate mb-0.5">
        {tip.placeName}
      </p>
      <p className="text-xs text-dark/60 leading-snug line-clamp-2">
        {tip.note}
      </p>
    </li>
  );
}
