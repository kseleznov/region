"use client";

import { motion, AnimatePresence } from "framer-motion";

interface SectionTransitionProps {
  isVisible: boolean;
  categoryName: string;
  direction: "up" | "down" | null;
}

export function SectionTransition({
  isVisible,
  categoryName,
}: SectionTransitionProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
        >
          <div className="bg-black/85 backdrop-blur-xl px-8 py-5 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10">
            <h2 className="text-xl font-bold text-white">{categoryName}</h2>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
