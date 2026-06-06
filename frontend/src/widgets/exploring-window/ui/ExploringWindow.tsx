"use client";

import { MapPin, RefreshCw } from "lucide-react";
import { Chips, Search } from "@/shared/ui";
import { Filters } from "./Filters";
import { PlaceSlider } from "./PlaceSlider";
import { SubcategoryModal } from "./SubcategoryModal";
import { ViewControl } from "./ViewControl";
import { useExploringWindow } from "../model/useExploringWindow";
import type { Category } from "../model/types";
import type { ICard } from "@/shared/types/card";

export interface ExploringWindowProps {
  categories: Category[];
  initialPlaces: ICard[];
}

export function ExploringWindow({
  categories,
  initialPlaces,
}: ExploringWindowProps) {
  const {
    selectedCity,
    activeCategoryIndex,
    activeSubcategory,
    subcategoryModalOpen,
    currentCardIndex,
    transitionDirection,
    hintPhase,
    activeCategory,
    filteredPlaces,
    totalCount,
    changeCity,
    handleCategoryChange,
    handleChipChange,
    setActiveSubcategory,
    setSubcategoryModalOpen,
    setCurrentCardIndex,
    setHintPhase,
  } = useExploringWindow(categories, initialPlaces);

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
            if (index > 0) {
              setHintPhase((phase) => (phase === "card" ? "category" : phase));
            }
          }}
          hintPhase={hintPhase}
          onHideHint={() =>
            setHintPhase((phase) => (phase === "category" ? "done" : phase))
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
        onApply={(subcategory) => setActiveSubcategory(subcategory)}
      />
    </div>
  );
}
