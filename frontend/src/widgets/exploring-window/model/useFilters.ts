import { useState } from "react";
import type { FiltersState } from "./types";
import { activeFilterFlags, DEFAULT_FILTERS } from "./filters";

/**
 * Drives the filter sheet. `filters` is the applied state (owned by the
 * parent so the places query can react to it); `pending` is the local
 * draft the user edits inside the sheet until they hit "Show results".
 */
export function useFilters(
  filters: FiltersState,
  onApply: (next: FiltersState) => void,
) {
  const [isOpen, setIsOpen] = useState(false);
  const [pending, setPending] = useState<FiltersState>(filters);

  const activeFlags = activeFilterFlags(filters);
  const activeCount = Object.values(activeFlags).filter(Boolean).length;
  const hasActive = activeCount > 0;

  function openModal() {
    setPending(filters);
    setIsOpen(true);
  }

  function applyFilters() {
    onApply(pending);
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
    pending,
    openModal,
    applyFilters,
    resetPending,
    setIsOpen,
    setPending,
  };
}
