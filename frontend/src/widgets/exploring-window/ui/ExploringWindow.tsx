"use client";

import { useSelectCityStore } from "@/features/select-city";
import { ROUTES } from "@/shared/config/routes";
import { Chips, Search } from "@/shared/ui";
import type { ICard } from "@/shared/types/card";
import { MapPin, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Category } from "../model/categories";
import { Filters } from "./Filters";
import { PlaceSlider } from "./PlaceSlider";
import { SubcategoryModal } from "./SubcategoryModal";
import { ViewControl } from "./ViewControl";

interface ExploringWindowProps {
  categories: Category[];
  places: ICard[];
}

export function ExploringWindow({ categories, places }: ExploringWindowProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const { selectedCity } = useSelectCityStore();
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(
    null,
  );
  const [subcategoryModalOpen, setSubcategoryModalOpen] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState<
    "up" | "down" | null
  >(null);
  const [hintPhase, setHintPhase] = useState<"category" | "card" | "done">(
    "card",
  );
  const router = useRouter();
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

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

  const totalCount = filteredPlaces.length;

  function changeCity() {
    router.push(ROUTES.region);
  }

  const handleCategoryChange = (newIndex: number, dir: "up" | "down") => {
    setActiveCategoryIndex(newIndex);
    setCurrentCardIndex(0);
    setTransitionDirection(dir);
    if (transitionTimeoutRef.current)
      clearTimeout(transitionTimeoutRef.current);
    transitionTimeoutRef.current = setTimeout(
      () => setTransitionDirection(null),
      700,
    );
  };

  const handleChipChange = (id: string) => {
    const newIndex = categories.findIndex((c) => c.id === id);
    if (newIndex === activeCategoryIndex) {
      if (activeCategory.subcategories.length > 0) {
        setSubcategoryModalOpen(true);
      }
      return;
    }
    setHintPhase("done");
    setActiveSubcategory(null);
    const dir = newIndex > activeCategoryIndex ? "down" : "up";
    handleCategoryChange(newIndex, dir);
  };

  return (
    <div className="h-dvh overflow-hidden flex flex-col pt-6 pb-28">
      <div className="flex justify-between items-start mb-4 px-4">
        <div>
          <p className="text-sm text-brand-gray">Exploring</p>
          <div className="flex gap-1 items-center">
            <MapPin className="text-brand-purple" strokeWidth={3} />
            <h1 className="text-3xl font-bold text-dark">{selectedCity}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-dark"
            onClick={changeCity}
          >
            Change city
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>
      <Search className="mb-4 mx-4" placeholder={`Search in ${selectedCity}`} />
      <div className="px-4 mb-4">
        <Chips
          chips={categories}
          activeId={activeCategory.id}
          onChange={handleChipChange}
          subcategoryLabel={activeSubcategory}
          onSubcategoryRemove={() => setActiveSubcategory(null)}
        />
      </div>
      <div className="flex items-center gap-2 mb-6">
        <div className="flex-1 min-w-0 overflow-hidden">
          <Filters />
        </div>
        <div className="flex-shrink-0 pr-4">
          <ViewControl
            currentCount={currentCardIndex + 1}
            totalCount={totalCount}
          />
        </div>
      </div>
      <div className="flex-1 min-h-0 pb-6">
        <PlaceSlider
          categoryId={activeCategory.id}
          places={filteredPlaces}
          categoryIndex={activeCategoryIndex}
          totalCategories={categories.length}
          categoryName={activeCategory.value}
          onCategoryChange={handleCategoryChange}
          onCardIndexChange={(index) => {
            setCurrentCardIndex(index);
            if (index > 0) setHintPhase((p) => (p === "card" ? "category" : p));
          }}
          hintPhase={hintPhase}
          onHideHint={() =>
            setHintPhase((p) => (p === "category" ? "done" : p))
          }
          transitionDirection={transitionDirection}
        />
      </div>

      <SubcategoryModal
        isOpen={subcategoryModalOpen}
        onClose={() => setSubcategoryModalOpen(false)}
        categoryName={activeCategory.value}
        subcategories={activeCategory.subcategories}
        activeSubcategory={activeSubcategory}
        onApply={(sub) => setActiveSubcategory(sub)}
      />
    </div>
  );
}
