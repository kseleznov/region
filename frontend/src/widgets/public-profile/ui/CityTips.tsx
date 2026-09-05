import Image from "next/image";
import { useCategoryLabel, useTranslation } from "@/shared/i18n";
import type { CityGuideStats } from "../model/types";

interface CityTipsProps {
  city: CityGuideStats;
  name: string;
}

export function CityTips({ city, name }: CityTipsProps) {
  const { t } = useTranslation();
  const categoryLabel = useCategoryLabel();

  if (city.tips.length === 0) {
    return (
      <p className="text-sm text-brand-gray bg-search-bg rounded-2xl p-4">
        {t("publicProfile.noTipsYet")}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {city.tips.map((tip) => (
        <article
          key={tip.id}
          className="flex gap-3 bg-search-bg rounded-2xl p-3"
        >
          <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
            <Image
              src={tip.placeImage}
              alt={tip.placeName}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2 mb-1">
              <p className="text-sm font-bold text-dark truncate">
                {tip.placeName}
              </p>
              <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wide text-brand-gray">
                {categoryLabel(tip.category)}
              </span>
            </div>
            <p className="text-xs text-dark/70 leading-relaxed line-clamp-2">
              {tip.note}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
