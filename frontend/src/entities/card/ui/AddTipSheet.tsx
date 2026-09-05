"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "@/shared/i18n";

interface AddTipSheetProps {
  isOpen: boolean;
  onClose: () => void;
  placeName: string;
  onConfirm: (note: string) => void;
}

export function AddTipSheet({
  isOpen,
  onClose,
  placeName,
  onConfirm,
}: AddTipSheetProps) {
  const { t } = useTranslation();
  const [note, setNote] = useState("");
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) setNote("");
  }

  function handleConfirm() {
    if (!note.trim()) return;
    onConfirm(note.trim());
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
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
              {t("card.addTipSheet.title")}
            </h2>
            <p className="text-sm text-brand-gray mb-4 truncate">{placeName}</p>

            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder={t("card.addTipSheet.placeholder")}
              maxLength={200}
              rows={3}
              autoFocus
              className="w-full resize-none rounded-2xl bg-search-bg px-4 py-3 text-dark font-medium outline-none focus:ring-2 focus:ring-brand-purple"
            />

            <button
              onClick={handleConfirm}
              disabled={!note.trim()}
              className="mt-4 w-full rounded-full bg-dark py-3.5 text-sm font-bold text-white disabled:opacity-40"
            >
              {t("card.addTipSheet.confirm")}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
