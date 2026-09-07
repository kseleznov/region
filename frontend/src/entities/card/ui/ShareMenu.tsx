import { Lightbulb, Share2 } from "lucide-react";
import { useTranslation } from "@/shared/i18n";

interface ShareMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: () => void;
  onAddTip: () => void;
}

export function ShareMenu({
  isOpen,
  onClose,
  onShare,
  onAddTip,
}: ShareMenuProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
      />
      <div className="absolute bottom-full left-0 mb-3 z-50 w-max rounded-2xl bg-white shadow-[0_8px_32px_rgba(0,0,0,0.16)] overflow-hidden">
        <button
          onClick={onShare}
          className="flex w-full items-center gap-2 px-3.5 py-2.5 whitespace-nowrap hover:bg-dark/[0.03] transition-colors"
        >
          <Share2
            className="w-3.5 h-3.5 text-dark flex-shrink-0"
            strokeWidth={2.5}
          />
          <span className="text-sm font-bold text-dark">
            {t("card.shareMenu.share")}
          </span>
        </button>
        <button
          onClick={onAddTip}
          className="flex w-full items-center gap-2 px-3.5 py-2.5 whitespace-nowrap border-t border-dark/[0.06] hover:bg-dark/[0.03] transition-colors"
        >
          <Lightbulb
            className="w-3.5 h-3.5 text-dark flex-shrink-0"
            strokeWidth={2.5}
          />
          <span className="text-sm font-bold text-dark">
            {t("card.shareMenu.addTip")}
          </span>
        </button>
      </div>
    </>
  );
}
