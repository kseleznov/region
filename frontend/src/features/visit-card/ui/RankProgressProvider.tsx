"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AnimatePresence } from "framer-motion";
import { RankProgress } from "@/entities/rank";

interface VisitAnnouncement {
  /** The visitor's place count after the visit that triggered this. */
  placesVisited: number;
  /** Whether that visit pushed them into a new rank. */
  rankedUp: boolean;
}

interface RankProgressContextValue {
  /** Show the post-visit progress card (or the rank-up celebration). */
  announceVisit: (announcement: VisitAnnouncement) => void;
}

const RankProgressContext = createContext<RankProgressContextValue | null>(
  null,
);

interface RankProgressProviderProps {
  children: React.ReactNode;
}

export function RankProgressProvider({ children }: RankProgressProviderProps) {
  const [announcement, setAnnouncement] = useState<VisitAnnouncement | null>(
    null,
  );

  const announceVisit = useCallback(
    (next: VisitAnnouncement) => setAnnouncement(next),
    [],
  );

  // Stable so the card's dismiss effect isn't torn down on every render.
  const dismiss = useCallback(() => setAnnouncement(null), []);

  // Lock body scroll while a card is up — done here, on the single provider
  // instance, so overlapping enter/exit of consecutive cards can't leave the
  // page's `overflow` stuck.
  useEffect(() => {
    if (!announcement) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [announcement]);

  const value = useMemo(() => ({ announceVisit }), [announceVisit]);

  return (
    <RankProgressContext.Provider value={value}>
      {children}

      <AnimatePresence>
        {announcement && (
          <RankProgress
            key={`${announcement.rankedUp ? "rankUp" : "visit"}-${announcement.placesVisited}`}
            variant={announcement.rankedUp ? "rankUp" : "visit"}
            placesVisited={announcement.placesVisited}
            onDismiss={dismiss}
          />
        )}
      </AnimatePresence>
    </RankProgressContext.Provider>
  );
}

export function useRankProgress(): RankProgressContextValue {
  const context = useContext(RankProgressContext);

  if (!context) {
    throw new Error(
      "useRankProgress must be used within <RankProgressProvider>",
    );
  }

  return context;
}
