"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "@/shared/i18n";
import type { MyTip } from "@/entities/tip";

interface EditTipSheetProps {
  tip: MyTip | null;
  onClose: () => void;
  onSave: (id: number, note: string) => void;
}

export function EditTipSheet({ tip, onClose, onSave }: EditTipSheetProps) {
  const { t } = useTranslation();
  const [note, setNote] = useState(tip?.note ?? "");
  const [prevTipId, setPrevTipId] = useState(tip?.id ?? null);

  if (tip && tip.id !== prevTipId) {
    setPrevTipId(tip.id);
    setNote(tip.note);
  }

  function handleSave() {
    if (!tip || !note.trim()) return;
    onSave(tip.id, note.trim());
    onClose();
  }

  return (
    <AnimatePresence>
      {tip && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-end justify-center"
          initial={{ backgroundColor: "rgba(0,0,0,0)" }}
          animate={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          exit={{ backgroundColor: "rgba(0,0,0,0)" }}
          transition={{ duration: 0.2 }}
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
        >
          <motion.div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-[452px] rounded-t-3xl bg-white px-4 pt-5 pb-8"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <h2 className="text-xl font-bold text-dark mb-1">
              {t("profile.editTipSheet.title")}
            </h2>
            <p className="text-sm text-brand-gray mb-4 truncate">
              {tip.placeName}
            </p>

            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              maxLength={200}
              rows={3}
              autoFocus
              className="w-full resize-none rounded-2xl bg-search-bg px-4 py-3 text-dark font-medium outline-none focus:ring-2 focus:ring-brand-purple"
            />

            <button
              onClick={handleSave}
              disabled={!note.trim()}
              className="mt-4 w-full rounded-full bg-dark py-3.5 text-sm font-bold text-white disabled:opacity-40"
            >
              {t("profile.editTipSheet.save")}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
