import { useTranslation } from "@/shared/i18n";
import { useToast } from "@/shared/ui";
import { useTipsStore } from "./useTipsStore";
import type { MyTip } from "./types";

/** Adds a tip and confirms it with a toast — mirrors `useToggleSave`/`useToggleVisit`. */
export function useAddTip() {
  const addTip = useTipsStore((state) => state.addTip);
  const { showToast } = useToast();
  const { t } = useTranslation();

  return function addTipAndNotify(tip: Omit<MyTip, "id">) {
    addTip(tip);
    showToast(t("toast.tipAdded"));
  };
}
