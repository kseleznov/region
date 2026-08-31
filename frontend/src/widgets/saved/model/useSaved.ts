"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { usePlaces, useCategories } from "@/entities/place";
import type { Category } from "@/shared/types/category";
import {
  hasSeenSwipeHint,
  markSwipeHintSeen,
  subscribeSwipeHintSeen,
} from "@/shared/lib/swipeHintSeen";

type HintPhase = "category" | "card" | "done";

export type SavedTab = "saved" | "visited";

const ALL_CATEGORY: Category = { id: "all", value: "All", subcategories: [] };

export function useSaved() {
  const { data: allCards = [] } = usePlaces();
  const { data: allCategories = [] } = useCategories();

  const [tab, setTab] = useState<SavedTab>("saved");
  const savedCards = allCards.filter((card) => card.isSaved);
  const visitedCards = allCards.filter((card) => card.isVisited);
  const places = tab === "saved" ? savedCards : visitedCards;

  // Use the same canonical category list as the explore page, narrowed to the
  // categories that actually have a place in the current tab.
  const categories = useMemo<Category[]>(() => {
    const present = new Set(places.map((p) => p.category));
    const matched = allCategories.filter((cat) =>
      cat.subcategories.length === 0
        ? present.has(cat.id)
        : cat.subcategories.some((sub) => present.has(sub)),
    );
    return [ALL_CATEGORY, ...matched];
  }, [places, allCategories]);

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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

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
    if (activeCategory.subcategories.length === 0) {
      return places.filter((card) => card.category === activeCategory.id);
    }
    return places.filter((card) =>
      activeCategory.subcategories.includes(card.category),
    );
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
