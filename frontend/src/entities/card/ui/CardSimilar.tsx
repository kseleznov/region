import Image from "next/image";
import { Star } from "lucide-react";
import { useCategoryLabel, useTranslation } from "@/shared/i18n";
import type { ICard } from "@/shared/types/card";

interface CardSimilarProps {
  places: ICard[];
  onSelect: (place: ICard, rect: DOMRect) => void;
}

export function CardSimilar({ places, onSelect }: CardSimilarProps) {
  const { t } = useTranslation();
  const categoryLabel = useCategoryLabel();

  return (
    <section className="mb-4">
      <h3 className="text-xs font-bold text-dark/50 uppercase tracking-wider mb-3 px-1">
        {t("card.similarTitle")}
      </h3>
      <ul className="flex gap-3 overflow-x-auto -mx-6 px-6 snap-x snap-mandatory scroll-px-6 [&::-webkit-scrollbar]:hidden">
        {places.map((place) => (
          <li
            key={place.id ?? place.name}
            onClick={(e) =>
              onSelect(place, e.currentTarget.getBoundingClientRect())
            }
            className="w-44 flex-shrink-0 snap-start cursor-pointer active:scale-[0.98] transition-transform"
          >
            <div className="relative w-full h-32 rounded-2xl overflow-hidden mb-2">
              <Image
                src={place.image}
                alt={place.name}
                fill
                sizes="176px"
                className="object-cover"
              />
              <span className="absolute top-2 left-2 inline-block max-w-[calc(100%-1rem)] truncate bg-white/95 backdrop-blur-sm text-dark text-[10px] font-extrabold uppercase tracking-wide px-2 py-1 rounded-full">
                {categoryLabel(place.category)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-bold text-dark truncate">
                {place.name}
              </p>
              <span className="flex items-center gap-1 text-xs font-bold text-dark flex-shrink-0">
                <Star className="w-3 h-3 fill-dark text-dark" />
                {place.stars}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
