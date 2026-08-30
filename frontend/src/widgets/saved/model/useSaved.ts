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

export type SavedTab = "saved" | "visited";

type SavedCategory = {
  id: string;
  value: string;
};

const ALL_CATEGORY: SavedCategory = { id: "all", value: "All" };

export function useSaved() {
  const { data: allCards = [] } = usePlaces();

  const [tab, setTab] = useState<SavedTab>("saved");
  const savedCards = allCards.filter((card) => card.isSaved);
  const visitedCards = allCards.filter((card) => card.isVisited);
  const places = tab === "saved" ? savedCards : visitedCards;

  const categories = useMemo<SavedCategory[]>(() => {
    const unique = Array.from(new Set(places.map((c) => c.category)));
    return [ALL_CATEGORY, ...unique.map((cat) => ({ id: cat, value: cat }))];
  }, [places]);

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
    if (activeCategory.id === "all") return places;
    return places.filter((card) => card.category === activeCategory.id);
  }, [places, activeCategory]);

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

  function changeTab(next: SavedTab) {
    if (next === tab) return;
    setTab(next);
    setActiveCategoryIndex(0);
    setCurrentCardIndex(0);
    setTransitionDirection(null);
  }

  return {
    tab,
    changeTab,
    savedCount: savedCards.length,
    visitedCount: visitedCards.length,
    isEmpty: places.length === 0,
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
