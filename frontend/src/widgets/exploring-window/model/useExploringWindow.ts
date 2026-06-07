"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelectCityStore } from "@/features/select-city";
import { usePlaces } from "@/entities/place";
import { ROUTES } from "@/shared/config/routes";
import type { ICard } from "@/shared/types/card";
import type { Category, HintPhase } from "./types";

export function useExploringWindow(
  categories: Category[],
  initialPlaces: ICard[],
) {
  const { data: places = [] } = usePlaces(initialPlaces);
  const { selectedCity } = useSelectCityStore();
  const router = useRouter();
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(
    null,
  );
  const [subcategoryModalOpen, setSubcategoryModalOpen] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState<
    "left" | "right" | null
  >(null);
  const [hintPhase, setHintPhase] = useState<HintPhase>("card");
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const activeCategory = categories[activeCategoryIndex];
  const filteredPlaces = useMemo(() => {
    if (activeSubcategory) {
      return places.filter((p) => p.category === activeSubcategory);
    }
    if (activeCategory.subcategories.length === 0) return places;
    return places.filter((p) =>
      activeCategory.subcategories.includes(p.category),
    );
  }, [places, activeCategory, activeSubcategory]);

  function changeCity() {
    router.push(ROUTES.region);
  }

  function handleCategoryChange(newIndex: number, dir: "left" | "right") {
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
    if (newIndex === activeCategoryIndex) {
      if (activeCategory.subcategories.length > 0) {
        setSubcategoryModalOpen(true);
      }
      return;
    }
    setHintPhase("done");
    setActiveSubcategory(null);
    const dir = newIndex > activeCategoryIndex ? "right" : "left";
    handleCategoryChange(newIndex, dir);
  }

  return {
    selectedCity,
    activeCategoryIndex,
    activeSubcategory,
    subcategoryModalOpen,
    currentCardIndex,
    transitionDirection,
    hintPhase,
    activeCategory,
    filteredPlaces,
    totalCount: filteredPlaces.length,
    changeCity,
    handleCategoryChange,
    handleChipChange,
    setActiveSubcategory,
    setSubcategoryModalOpen,
    setCurrentCardIndex,
    setHintPhase,
  };
}
