"use client";

import { motion, AnimatePresence } from "framer-motion";

type HintPhase = "category" | "card" | "done";

interface SwipeHintProps {
  phase: HintPhase;
  isVisible: boolean;
}

const circleTransition = {
  duration: 1.25,
  repeat: Infinity,
  ease: "easeOut" as const,
  times: [0, 0.2, 1],
};

const opacityTransition = {
  duration: 1.25,
  repeat: Infinity,
  ease: "easeOut" as const,
  times: [0, 0.33, 0.9, 1],
};

export function SwipeHint({ phase, isVisible }: SwipeHintProps) {
  const show = isVisible && phase !== "done";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={phase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center gap-4"
        >
          {phase === "category" ? (
            <>
              <div className="relative w-[50px] h-[160px] flex flex-col items-center justify-start">
                <motion.div
                  animate={{ y: [130, 130, 0], opacity: [0, 1, 1, 0] }}
                  transition={{ y: circleTransition, opacity: opacityTransition }}
                  className="w-[30px] h-[30px] rounded-full border-2 border-white/60"
                />
              </div>
              <span className="text-sm font-medium text-white/90 whitespace-nowrap bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                swipe for next category
              </span>
            </>
          ) : (
            <>
              <div className="relative w-[200px] h-[50px] flex items-center">
                <motion.div
                  animate={{ x: [160, 160, 0], opacity: [0, 1, 1, 0] }}
                  transition={{ x: circleTransition, opacity: opacityTransition }}
                  className="w-[30px] h-[30px] rounded-full border-2 border-white/60"
                />
              </div>
              <span className="text-sm font-medium text-white/90 whitespace-nowrap bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                swipe for next card
              </span>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
