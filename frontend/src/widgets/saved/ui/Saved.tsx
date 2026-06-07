"use client";

import { Heart } from "lucide-react";
import { Chips } from "@/shared/ui";
import { PlaceSlider } from "@/widgets/exploring-window/ui/PlaceSlider";
import { ViewControl } from "@/widgets/exploring-window/ui/ViewControl";
import { useSaved } from "../model/useSaved";

export function Saved() {
  const {
    savedCards,
    categories,
    activeCategoryIndex,
    activeCategory,
    filteredPlaces,
    totalCount,
    currentCardIndex,
    transitionDirection,
    hintPhase,
    handleCategoryChange,
    handleChipChange,
    setCurrentCardIndex,
    setHintPhase,
  } = useSaved();

  if (!savedCards.length) {
    return (
      <div className="flex flex-col px-4 pt-6">
        <div>
          <p className="text-sm text-brand-gray">Your collection</p>
          <h1 className="text-3xl font-bold text-dark">Saved</h1>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 mt-32">
          <div className="w-24 h-24 rounded-3xl bg-brand-pink/20 flex items-center justify-center">
            <Heart size={40} className="text-brand-pink fill-brand-pink" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-xl font-bold text-dark">Nothing saved yet</p>
            <p className="text-sm text-brand-gray text-center">
              Tap the heart on any place to save it
              <br />
              here for later
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-dvh overflow-hidden flex flex-col pt-6 pb-28">
      <div className="flex justify-between items-start mb-4 px-4">
        <div>
          <p className="text-sm text-brand-gray">Your collection</p>
          <h1 className="text-3xl font-bold text-dark">Saved</h1>
        </div>
        <div className="flex-shrink-0 pt-2">
          <ViewControl
            currentCount={currentCardIndex + 1}
            totalCount={totalCount}
          />
        </div>
      </div>

      <div className="px-4 mb-6">
        <Chips
          chips={categories}
          activeId={activeCategory.id}
          onChange={handleChipChange}
        />
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
    </div>
  );
}