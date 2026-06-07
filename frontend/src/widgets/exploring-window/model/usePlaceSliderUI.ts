"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useToggleSave } from "@/features/save-card";
import { useToggleVisit } from "@/features/visit-card";
import { placeApi } from "@/entities/place";
import type { ICard, SelectedCard } from "@/shared/types/card";

interface UsePlaceSliderUIProps {
  categoryIndex: number;
  totalCategories: number;
  transitionDirection: "up" | "down" | null;
  onCategoryChange: (newIndex: number, dir: "up" | "down") => void;
  onHideHint: () => void;
}

export function usePlaceSliderUI({
  categoryIndex,
  totalCategories,
  transitionDirection,
  onCategoryChange,
  onHideHint,
}: UsePlaceSliderUIProps) {
  const { mutate: toggleSave } = useToggleSave();
  const { mutate: toggleVisit } = useToggleVisit();
  const [selected, setSelected] = useState<SelectedCard | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const animDir = useRef<"up" | "down" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  if (transitionDirection !== null) {
    animDir.current = transitionDirection;
  }

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startX = 0;
    let startY = 0;
    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;
      if (Math.abs(dy) > Math.abs(dx)) e.preventDefault();
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
    };
  }, []);

  const triggerVerticalSwipe = useCallback(
    (dx: number, dy: number) => {
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      const threshold = 60;
      if (absY > absX && absY > threshold) {
        onHideHint();
        if (dy < 0) {
          onCategoryChange((categoryIndex + 1) % totalCategories, "down");
        } else {
          const prev =
            categoryIndex === 0 ? totalCategories - 1 : categoryIndex - 1;
          onCategoryChange(prev, "up");
        }
      }
    },
    [categoryIndex, totalCategories, onCategoryChange, onHideHint],
  );

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart.current) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStart.current.x;
      const dy = t.clientY - touchStart.current.y;
      touchStart.current = null;
      triggerVerticalSwipe(dx, dy);
    },
    [triggerVerticalSwipe],
  );

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    touchStart.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseUp = useCallback(
    (e: React.MouseEvent) => {
      if (!touchStart.current) return;
      const dx = e.clientX - touchStart.current.x;
      const dy = e.clientY - touchStart.current.y;
      touchStart.current = null;
      triggerVerticalSwipe(dx, dy);
    },
    [triggerVerticalSwipe],
  );

  async function handleCardSelect(card: ICard, rect: DOMRect) {
    try {
      const full = card.id ? await placeApi.getById(card.id) : null;
      setSelected({ card: full ?? card, rect });
    } catch {
      setSelected({ card, rect });
    }
  }

  function toggleSaveSelected() {
    if (!selected?.card.id) return;
    toggleSave(selected.card.id, {
      onSuccess: (updated) =>
        setSelected(
          (prev) =>
            prev && {
              ...prev,
              card: { ...prev.card, isSaved: updated.isSaved },
            },
        ),
    });
  }

  function toggleVisitSelected() {
    if (!selected?.card.id) return;
    toggleVisit(selected.card.id, {
      onSuccess: (updated) =>
        setSelected(
          (prev) =>
            prev && {
              ...prev,
              card: { ...prev.card, isVisited: updated.isVisited },
            },
        ),
    });
  }

  return {
    selected,
    setSelected,
    isSelectedSaved: selected?.card.isSaved ?? false,
    isSelectedVisited: selected?.card.isVisited ?? false,
    animDir,
    containerRef,
    handleTouchStart,
    handleTouchEnd,
    handleMouseDown,
    handleMouseUp,
    handleCardSelect,
    toggleSaveSelected,
    toggleVisitSelected,
  };
}
