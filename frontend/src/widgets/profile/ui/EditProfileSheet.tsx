"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useTranslation } from "@/shared/i18n";
import { useResetOnOpen } from "../model/useResetOnOpen";

interface EditProfileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  username: string;
  bio: string;
  onSave: (next: { name: string; bio: string }) => void;
}

export function EditProfileSheet({
  isOpen,
  onClose,
  name,
  username,
  bio,
  onSave,
}: EditProfileSheetProps) {
  const { t } = useTranslation();
  const [nameDraft, setNameDraft] = useState(name);
  const [bioDraft, setBioDraft] = useState(bio);

  useResetOnOpen(isOpen, () => {
    setNameDraft(name);
    setBioDraft(bio);
  });

  function handleSave() {
    onSave({ name: nameDraft.trim(), bio: bioDraft.trim() });
    onClose();
  }

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
            className="w-full max-w-[452px] rounded-t-3xl bg-white px-4 pt-5 pb-8"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <h2 className="text-xl font-bold text-dark mb-4">
              {t("profile.editSheet.title")}
            </h2>

            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-brand-gray uppercase tracking-wider">
                  {t("profile.editSheet.nameLabel")}
                </span>
                <input
                  value={nameDraft}
                  onChange={(event) => setNameDraft(event.target.value)}
                  className="rounded-2xl bg-search-bg px-4 py-3 text-dark font-medium outline-none focus:ring-2 focus:ring-brand-purple"
                  maxLength={60}
                />
              </label>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-brand-gray uppercase tracking-wider">
                  {t("profile.editSheet.usernameLabel")}
                </span>
                <div className="flex items-center gap-2 rounded-2xl bg-search-bg px-4 py-3 text-dark/50">
                  <Lock size={14} className="flex-shrink-0" />
                  <span className="font-medium">@{username}</span>
                </div>
                <p className="text-xs text-brand-gray">
                  {t("profile.editSheet.usernameHint")}
                </p>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-brand-gray uppercase tracking-wider">
                  {t("profile.editSheet.bioLabel")}
                </span>
                <textarea
                  value={bioDraft}
                  onChange={(event) => setBioDraft(event.target.value)}
                  placeholder={t("profile.editSheet.bioPlaceholder")}
                  maxLength={140}
                  rows={3}
                  className="resize-none rounded-2xl bg-search-bg px-4 py-3 text-dark font-medium outline-none focus:ring-2 focus:ring-brand-purple"
                />
              </label>
            </div>

            <button
              onClick={handleSave}
              disabled={!nameDraft.trim()}
              className="mt-6 w-full rounded-full bg-dark py-3.5 text-sm font-bold text-white disabled:opacity-40"
            >
              {t("profile.editSheet.save")}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
