import { useTranslation } from "@/shared/i18n";
import { useToast } from "@/shared/ui";
import { useTipsStore } from "./useTipsStore";

/** Updates a tip's note and confirms it with a toast — mirrors `useAddTip`. */
export function useEditTip() {
  const editTip = useTipsStore((state) => state.editTip);
  const { showToast } = useToast();
  const { t } = useTranslation();

  return function editTipAndNotify(id: string, note: string) {
    editTip(id, note);
    showToast(t("toast.tipUpdated"));
  };
}
