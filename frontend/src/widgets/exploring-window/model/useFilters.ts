import { useState } from "react";
import { FiltersState } from "./types";
import { DEFAULT_FILTERS } from "./filters";

export function useFilters() {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS);
  const [pending, setPending] = useState<FiltersState>(DEFAULT_FILTERS);
  const activeFlags = {
    sort: filters.sort !== "top-rated",
    price: filters.price !== null,
    rating: filters.rating !== "any",
    openNow: filters.openNow,
  };
  const activeCount = Object.values(activeFlags).filter(Boolean).length;
  const hasActive = activeCount > 0;

  function openModal() {
    setPending(filters);
    setIsOpen(true);
  }

  function applyFilters() {
    setFilters(pending);
    setIsOpen(false);
  }

  function resetPending() {
    setPending(DEFAULT_FILTERS);
  }

  return {
    isOpen,
    hasActive,
    activeCount,
    activeFlags,
    filters,
    pending,
    openModal,
    applyFilters,
    resetPending,
    setFilters,
    setIsOpen,
    setPending,
  };
}
