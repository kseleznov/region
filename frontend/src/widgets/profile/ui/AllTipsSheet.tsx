"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useEditTip } from "@/features/tips";
import { useTranslation } from "@/shared/i18n";
import { TipCard } from "./TipCard";
import { EditTipSheet } from "./EditTipSheet";
import type { MyTip } from "@/entities/tip";

interface AllTipsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  tips: MyTip[];
  onRemove: (id: number) => void;
  onOpenPlace: (placeId: number, rect: DOMRect) => void;
}

export function AllTipsSheet({
  isOpen,
  onClose,
  tips,
  onRemove,
  onOpenPlace,
}: AllTipsSheetProps) {
  const { t } = useTranslation();
  const { mutate: editTip } = useEditTip();
  const [editingTip, setEditingTip] = useState<MyTip | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center"
          initial={{ backgroundColor: "rgba(0,0,0,0)" }}
          animate={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          exit={{ backgroundColor: "rgba(0,0,0,0)" }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-[452px] h-[80dvh] flex flex-col rounded-t-3xl bg-white px-4 pt-5 pb-8"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 40 }}
          >
            <h2 className="text-xl font-bold text-dark mb-4 flex-shrink-0">
              {t("profile.myTips.title")} ({tips.length})
            </h2>

            <div className="flex-1 overflow-y-auto flex flex-col gap-2.5 [&::-webkit-scrollbar]:hidden">
              {tips.map((tip) => (
                <TipCard
                  key={tip.id}
                  tip={tip}
                  onOpenPlace={onOpenPlace}
                  onEdit={setEditingTip}
                  onRemove={onRemove}
                />
              ))}
            </div>

            <EditTipSheet
              tip={editingTip}
              onClose={() => setEditingTip(null)}
              onSave={(id, note) => editTip({ id, note })}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
