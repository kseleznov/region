"use client";

import { Heart, MapPinCheck } from "lucide-react";
import { Chips } from "@/shared/ui";
import { PlaceSlider } from "@/widgets/exploring-window/ui/PlaceSlider";
import { ViewControl } from "@/widgets/exploring-window/ui/ViewControl";
import { SavedTabs } from "./SavedTabs";
import { useSaved } from "../model/useSaved";

const EMPTY_STATE = {
  saved: {
    icon: Heart,
    iconClass: "text-brand-pink fill-brand-pink",
    title: "Nothing saved yet",
    hint: "Tap the heart on any place to save it here for later",
  },
  visited: {
    icon: MapPinCheck,
    iconClass: "text-brand-pink",
    title: "Nothing visited yet",
    hint: "Mark a place as visited and it shows up here",
  },
} as const;

export function Saved() {
  const {
    tab,
    changeTab,
    savedCount,
    visitedCount,
    isEmpty,
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

  const empty = EMPTY_STATE[tab];
  const EmptyIcon = empty.icon;

  return (
    <div className="h-dvh overflow-hidden flex flex-col pt-6 pb-28">
      <div className="px-4 mb-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-brand-gray">Your collection</p>
            <h1 className="text-3xl font-bold text-dark">
              {tab === "saved" ? "Saved" : "Visited"}
            </h1>
          </div>
          {!isEmpty && (
            <div className="flex-shrink-0 pt-2 self-end">
              <ViewControl
                currentCount={currentCardIndex + 1}
                totalCount={totalCount}
              />
            </div>
          )}
        </div>

        <SavedTabs
          tab={tab}
          savedCount={savedCount}
          visitedCount={visitedCount}
          onChange={changeTab}
        />
      </div>

      {isEmpty ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 pb-16">
          <div className="w-24 h-24 rounded-3xl bg-brand-pink/20 flex items-center justify-center">
            <EmptyIcon size={40} className={empty.iconClass} />
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-xl font-bold text-dark">{empty.title}</p>
            <p className="text-sm text-brand-gray text-center">{empty.hint}</p>
          </div>
        </div>
      ) : (
        <>
          <div className="px-4 mb-6">
            <Chips
              chips={categories}
              activeId={activeCategory.id}
              onChange={handleChipChange}
            />
          </div>

          <div className="flex-1 min-h-0 pb-6">
            <PlaceSlider
              key={tab}
              categoryId={activeCategory.id}
              places={filteredPlaces}
              categoryIndex={activeCategoryIndex}
              totalCategories={categories.length}
              categoryName={activeCategory.value}
              onCategoryChange={handleCategoryChange}
              onCardIndexChange={(index) => {
                setCurrentCardIndex(index);
                if (index > 0) {
                  setHintPhase((phase) =>
                    phase === "card" ? "category" : phase,
                  );
                }
              }}
              hintPhase={hintPhase}
              onHideHint={() =>
                setHintPhase((phase) => (phase === "category" ? "done" : phase))
              }
              transitionDirection={transitionDirection}
            />
          </div>
        </>
      )}
    </div>
  );
}
