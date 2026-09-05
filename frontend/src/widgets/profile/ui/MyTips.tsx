import { useTranslation } from "@/shared/i18n";
import { TipCard } from "./TipCard";
import type { MyTip } from "@/entities/tip";

const PREVIEW_COUNT = 3;

interface MyTipsProps {
  tips: MyTip[];
  onShowAllClick: () => void;
}

export function MyTips({ tips, onShowAllClick }: MyTipsProps) {
  const { t } = useTranslation();
  const preview = tips.slice(0, PREVIEW_COUNT);
  const hasMore = tips.length > PREVIEW_COUNT;

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
        <div className="flex flex-col gap-2.5">
          {preview.map((tip) => (
            <TipCard key={tip.id} tip={tip} />
          ))}

          {hasMore && (
            <button
              onClick={onShowAllClick}
              className="text-sm font-bold text-brand-purple text-center py-1"
            >
              {t("profile.myTips.showAll", { count: tips.length })}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
