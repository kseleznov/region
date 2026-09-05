import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { useCategoryLabel, useTranslation } from "@/shared/i18n";
import type { MyTip } from "@/entities/tip";

interface TipCardProps {
  tip: MyTip;
  onEdit?: (tip: MyTip) => void;
  onRemove?: (id: number) => void;
}

export function TipCard({ tip, onEdit, onRemove }: TipCardProps) {
  const { t } = useTranslation();
  const categoryLabel = useCategoryLabel();

  return (
    <article className="flex gap-3 bg-search-bg rounded-2xl p-3">
      {tip.placeImage ? (
        <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={tip.placeImage}
            alt={tip.placeName}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-14 h-14 rounded-xl bg-brand-purple/10 flex items-center justify-center flex-shrink-0">
          <span className="text-[10px] font-bold text-brand-purple text-center px-1">
            {tip.cityName}
          </span>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2 mb-0.5">
          <p className="text-sm font-bold text-dark truncate">
            {tip.placeName}
          </p>
          {(onEdit || onRemove) && (
            <div className="flex items-center gap-2.5 flex-shrink-0">
              {onEdit && (
                <button
                  onClick={() => onEdit(tip)}
                  aria-label={t("profile.myTips.editAria", {
                    name: tip.placeName,
                  })}
                  className="text-brand-gray hover:text-brand-purple transition-colors"
                >
                  <Pencil size={14} />
                </button>
              )}
              {onRemove && (
                <button
                  onClick={() => onRemove(tip.id)}
                  aria-label={t("profile.myTips.removeAria", {
                    name: tip.placeName,
                  })}
                  className="text-brand-gray hover:text-brand-pink transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              )}
            </div>
          )}
        </div>
        <p className="text-[11px] font-bold uppercase tracking-wide text-brand-gray mb-1">
          {tip.cityName} · {categoryLabel(tip.category)}
        </p>
        <p className="text-xs text-dark/70 leading-relaxed line-clamp-2">
          {tip.note}
        </p>
      </div>
    </article>
  );
}
