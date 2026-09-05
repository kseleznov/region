import { useTranslation } from "@/shared/i18n";
import { CityTipCard } from "./CityTipCard";
import type { CityGuideStats } from "@/entities/user";

interface CityTipsProps {
  city: CityGuideStats;
  onOpenPlace: (placeId: number, rect: DOMRect) => void;
}

export function CityTips({ city, onOpenPlace }: CityTipsProps) {
  const { t } = useTranslation();

  if (city.tips.length === 0) {
    return (
      <p className="text-sm text-brand-gray bg-search-bg rounded-2xl p-4">
        {t("publicProfile.noTipsYet")}
      </p>
    );
  }

  return (
    <ul className="flex gap-3 overflow-x-auto -mx-4 px-4 snap-x snap-mandatory scroll-px-4 [&::-webkit-scrollbar]:hidden">
      {city.tips.map((tip) => (
        <CityTipCard key={tip.id} tip={tip} onOpenPlace={onOpenPlace} />
      ))}
    </ul>
  );
}
