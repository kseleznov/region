"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import {
  LOCALES,
  LOCALE_LABELS,
  useSetLocale,
  useTranslation,
} from "@/shared/i18n";

interface LanguageSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LanguageSheet({ isOpen, onClose }: LanguageSheetProps) {
  const { t, locale } = useTranslation();
  const setLocale = useSetLocale();

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
            <div className="mb-4">
              <h2 className="text-xl font-bold text-dark">
                {t("profile.languageSheet.title")}
              </h2>
              <p className="text-sm text-brand-gray">
                {t("profile.languageSheet.subtitle")}
              </p>
            </div>

            <div className="bg-search-bg rounded-2xl divide-y divide-gray-200">
              {LOCALES.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setLocale(option);
                    onClose();
                  }}
                  className="flex w-full items-center justify-between px-4 py-4 first:rounded-t-2xl last:rounded-b-2xl"
                >
                  <span
                    className={cn(
                      "font-medium",
                      option === locale ? "text-brand-purple" : "text-dark",
                    )}
                  >
                    {LOCALE_LABELS[option]}
                  </span>
                  {option === locale && (
                    <Check size={20} className="text-brand-purple" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
