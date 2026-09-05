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
      <div className="absolute bottom-full right-0 mb-3 z-50 w-56 rounded-2xl bg-white shadow-[0_8px_32px_rgba(0,0,0,0.16)] overflow-hidden">
        <button
          onClick={onShare}
          className="flex w-full items-center gap-3 px-4 py-3.5 hover:bg-dark/[0.03] transition-colors"
        >
          <Share2 className="w-4 h-4 text-dark" strokeWidth={2.5} />
          <span className="text-sm font-bold text-dark">
            {t("card.shareMenu.share")}
          </span>
        </button>
        <button
          onClick={onAddTip}
          className="flex w-full items-center gap-3 px-4 py-3.5 border-t border-dark/[0.06] hover:bg-dark/[0.03] transition-colors"
        >
          <Lightbulb className="w-4 h-4 text-dark" strokeWidth={2.5} />
          <span className="text-sm font-bold text-dark">
            {t("card.shareMenu.addTip")}
          </span>
        </button>
      </div>
    </>
  );
}
