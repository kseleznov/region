"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/shared/lib/cn";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description?: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "default" | "danger";
}

export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  variant = "default",
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center px-8"
          initial={{ backgroundColor: "rgba(0,0,0,0)" }}
          animate={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          exit={{ backgroundColor: "rgba(0,0,0,0)" }}
          transition={{ duration: 0.2 }}
          onClick={(event) => {
            event.stopPropagation();
            onCancel();
          }}
        >
          <motion.div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-[340px] rounded-3xl bg-white p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <h2 className="text-lg font-bold text-dark text-center mb-1">
              {title}
            </h2>
            {description && (
              <p className="text-sm text-brand-gray text-center mb-5">
                {description}
              </p>
            )}
            <div className={cn("flex gap-3", !description && "mt-5")}>
              <button
                onClick={onCancel}
                className="flex-1 rounded-full border border-dark/10 py-3 text-sm font-bold text-dark"
              >
                {cancelLabel}
              </button>
              <button
                onClick={onConfirm}
                className={cn(
                  "flex-1 rounded-full py-3 text-sm font-bold text-white",
                  variant === "danger" ? "bg-brand-pink" : "bg-dark",
                )}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
