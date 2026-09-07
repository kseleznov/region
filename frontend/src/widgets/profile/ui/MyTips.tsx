import { useTranslation } from "@/shared/i18n";
import { TipPreviewCard } from "./TipPreviewCard";
import type { MyTip } from "@/entities/tip";

interface MyTipsProps {
  tips: MyTip[];
  onShowAllClick: () => void;
  onOpenPlace: (placeId: number, rect: DOMRect) => void;
}

export function MyTips({ tips, onShowAllClick, onOpenPlace }: MyTipsProps) {
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold text-brand-gray uppercase tracking-wider">
          {t("profile.myTips.title")}
        </h3>
        {tips.length > 0 && (
          <button
            onClick={onShowAllClick}
            className="text-sm font-bold text-brand-purple"
          >
            {t("profile.myTips.edit")}
          </button>
        )}
      </div>

      {tips.length === 0 ? (
        <p className="text-sm text-brand-gray bg-search-bg rounded-2xl p-4">
          {t("profile.myTips.empty")}
        </p>
      ) : (
        <ul className="flex gap-3 overflow-x-auto -mx-4 px-4 snap-x snap-mandatory scroll-px-4 [&::-webkit-scrollbar]:hidden">
          {tips.map((tip) => (
            <TipPreviewCard key={tip.id} tip={tip} onOpenPlace={onOpenPlace} />
          ))}
        </ul>
      )}
    </div>
  );
}
