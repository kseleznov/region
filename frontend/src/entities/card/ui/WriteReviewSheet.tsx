"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { useTranslation } from "@/shared/i18n";

const MAX_RATING = 5;
const MAX_TEXT_LENGTH = 1000;

interface WriteReviewSheetProps {
  isOpen: boolean;
  onClose: () => void;
  placeName: string;
  onSubmit: (input: { rating: number; text: string }) => void;
}

export function WriteReviewSheet({
  isOpen,
  onClose,
  placeName,
  onSubmit,
}: WriteReviewSheetProps) {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setRating(0);
      setText("");
    }
  }

  const canSubmit = rating > 0 && text.trim().length > 0;

  function handleSubmit() {
    if (!canSubmit) return;
    onSubmit({ rating, text: text.trim() });
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
              {t("card.writeReviewSheet.title")}
            </h2>
            <p className="text-sm text-brand-gray mb-4 truncate">{placeName}</p>

            <div
              className="flex items-center gap-2 mb-4"
              role="radiogroup"
              aria-label={t("card.writeReviewSheet.ratingLabel")}
            >
              {Array.from({ length: MAX_RATING }).map((_, index) => {
                const value = index + 1;
                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={rating === value}
                    aria-label={t("card.writeReviewSheet.starsAria", {
                      count: value,
                    })}
                    onClick={() => setRating(value)}
                    className="p-1 transition-transform active:scale-90"
                  >
                    <Star
                      className={cn(
                        "w-8 h-8",
                        value <= rating
                          ? "fill-brand-yellow text-brand-yellow"
                          : "fill-dark/10 text-dark/15",
                      )}
                      strokeWidth={1.5}
                    />
                  </button>
                );
              })}
            </div>

            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder={t("card.writeReviewSheet.placeholder")}
              maxLength={MAX_TEXT_LENGTH}
              rows={4}
              className="w-full resize-none rounded-2xl bg-search-bg px-4 py-3 text-dark font-medium outline-none focus:ring-2 focus:ring-brand-purple"
            />

            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="mt-4 w-full rounded-full bg-dark py-3.5 text-sm font-bold text-white disabled:opacity-40"
            >
              {t("card.writeReviewSheet.confirm")}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
