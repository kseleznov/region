"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { usePlaces } from "@/entities/place";
import {
  hasSeenSwipeHint,
  markSwipeHintSeen,
  subscribeSwipeHintSeen,
} from "@/shared/lib/swipeHintSeen";

type HintPhase = "category" | "card" | "done";

type SavedCategory = {
  id: string;
  value: string;
};

const ALL_CATEGORY: SavedCategory = { id: "all", value: "All" };

export function useSaved() {
  const { data: allCards = [] } = usePlaces();
  const savedCards = allCards.filter((card) => card.isSaved);

  const categories = useMemo<SavedCategory[]>(() => {
    const unique = Array.from(new Set(savedCards.map((c) => c.category)));
    return [ALL_CATEGORY, ...unique.map((cat) => ({ id: cat, value: cat }))];
  }, [savedCards]);

  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState<
    "up" | "down" | null
  >(null);
  const [hintPhase, setHintPhase] = useState<HintPhase>("card");
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  // A vertical swipe moves the hint to "category"; a horizontal one then moves
  // it to "done". Remember the hint as seen only once both have happened.
  const hintReachedCategoryRef = useRef(false);

  // One-time onboarding hint — show it once, then never again (persisted).
  const hintSeen = useSyncExternalStore(
    subscribeSwipeHintSeen,
    hasSeenSwipeHint,
    () => true,
  );

  useEffect(() => {
    if (hintSeen) return;
    if (hintPhase === "category") {
      hintReachedCategoryRef.current = true;
    }
    if (hintPhase === "done" && hintReachedCategoryRef.current) {
      markSwipeHintSeen();
    }
  }, [hintSeen, hintPhase]);

  const safeIndex = Math.min(activeCategoryIndex, categories.length - 1);
  const activeCategory = categories[safeIndex];

  const filteredPlaces = useMemo(() => {
    if (activeCategory.id === "all") return savedCards;
    return savedCards.filter((card) => card.category === activeCategory.id);
  }, [savedCards, activeCategory]);

  function handleCategoryChange(newIndex: number, dir: "up" | "down") {
    setActiveCategoryIndex(newIndex);
    setCurrentCardIndex(0);
    setTransitionDirection(dir);
    if (transitionTimeoutRef.current)
      clearTimeout(transitionTimeoutRef.current);
    transitionTimeoutRef.current = setTimeout(
      () => setTransitionDirection(null),
      700,
    );
  }

  function handleChipChange(id: string) {
    const newIndex = categories.findIndex((c) => c.id === id);
    if (newIndex === safeIndex) return;
    const dir = newIndex > safeIndex ? "down" : "up";
    handleCategoryChange(newIndex, dir);
    setHintPhase("done");
  }

  return {
    savedCards,
    categories,
    activeCategoryIndex: safeIndex,
    activeCategory,
    filteredPlaces,
    totalCount: filteredPlaces.length,
    currentCardIndex,
    transitionDirection,
    hintPhase: hintSeen ? "done" : hintPhase,
    handleCategoryChange,
    handleChipChange,
    setCurrentCardIndex,
    setHintPhase,
  };
}
