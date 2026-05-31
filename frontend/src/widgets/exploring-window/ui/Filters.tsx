"use client";

import { SlidersHorizontal, X } from "lucide-react";
import type { SortOption } from "../model/types";
import { PRICE_OPTIONS, RATING_OPTIONS, SORT_LABELS } from "../model/filters";
import { useFilters } from "../model/useFilters";

export function Filters() {
  const {
    openModal,
    hasActive,
    activeCount,
    isOpen,
    pending,
    applyFilters,
    setIsOpen,
    setPending,
    resetPending,
  } = useFilters();

  return (
    <>
      <div className="flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] ">
        <button
          onClick={openModal}
          className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
            hasActive ? "bg-dark text-white" : "bg-gray-100 text-dark"
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {hasActive && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-yellow text-xs font-bold text-dark">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center z-51">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative w-full max-w-[500px] rounded-t-3xl bg-white px-6 pb-8 pt-5">
            <div className="absolute left-1/2 top-3 h-1 w-10 -translate-x-1/2 rounded-full bg-gray-200" />

            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-dark">Filters</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100"
              >
                <X className="h-5 w-5 text-dark" />
              </button>
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-gray">
              Sort by
            </p>
            <div className="mb-6 grid grid-cols-2 gap-2">
              {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
                <button
                  key={option}
                  onClick={() =>
                    setPending((prev) => ({ ...prev, sort: option }))
                  }
                  className={`rounded-full border px-4 py-2.5 text-sm font-bold transition-colors ${
                    pending.sort === option
                      ? "border-brand-yellow bg-brand-yellow text-dark"
                      : "border-gray-200 bg-white text-dark"
                  }`}
                >
                  {SORT_LABELS[option]}
                </button>
              ))}
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-gray">
              Price
            </p>
            <div className="mb-6 flex gap-2">
              {PRICE_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() =>
                    setPending((prev) => ({
                      ...prev,
                      price: prev.price === option ? null : option,
                    }))
                  }
                  className={`flex-1 rounded-2xl border py-3 text-sm font-bold transition-colors ${
                    pending.price === option
                      ? "border-brand-yellow bg-brand-yellow text-dark"
                      : "border-gray-200 bg-white text-dark"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-gray">
              Minimum Rating
            </p>
            <div className="mb-6 flex gap-2">
              {RATING_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() =>
                    setPending((prev) => ({ ...prev, rating: option }))
                  }
                  className={`flex-1 rounded-2xl border py-3 text-sm font-bold transition-colors ${
                    pending.rating === option
                      ? "border-brand-yellow bg-brand-yellow text-dark"
                      : "border-gray-200 bg-white text-dark"
                  }`}
                >
                  {option === "any" ? "Any" : option}
                </button>
              ))}
            </div>

            <div className="mb-6 flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-4">
              <div>
                <p className="text-sm font-semibold text-dark">Open now</p>
                <p className="text-xs text-brand-gray">
                  Only show places currently open
                </p>
              </div>
              <button
                onClick={() =>
                  setPending((prev) => ({ ...prev, openNow: !prev.openNow }))
                }
                className={`relative h-7 w-12 rounded-full transition-colors ${
                  pending.openNow ? "bg-brand-yellow" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    pending.openNow ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={resetPending}
                className="flex-1 rounded-full border border-gray-200 py-4 text-sm font-bold text-dark"
              >
                Reset
              </button>
              <button
                onClick={applyFilters}
                className="flex-[2] rounded-full bg-brand-yellow py-4 text-sm font-bold text-dark"
              >
                Show results
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
