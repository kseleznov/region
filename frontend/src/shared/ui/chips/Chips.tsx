"use client";

import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Chip } from "./types";

interface ChipsProps {
  chips: Chip[];
  activeId: string;
  onChange: (id: string) => void;
  subcategoryLabel?: string | null;
  onSubcategoryRemove?: () => void;
}

export function Chips({ chips, activeId, onChange, subcategoryLabel, onSubcategoryRemove }: ChipsProps) {
  const scrollRef = useRef<HTMLUListElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const btn = activeRef.current;
      const scrollLeft =
        btn.offsetLeft - container.offsetWidth / 2 + btn.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeId]);

  return (
    <ul
      ref={scrollRef}
      className="flex overflow-x-auto gap-2 [scrollbar-width:none]"
    >
      {chips.flatMap((chip) => {
        const isActive = chip.id === activeId;

        const chipItem = (
          <li key={chip.id} className="flex-shrink-0">
            <button
              ref={isActive ? activeRef : null}
              onClick={() => onChange(chip.id)}
              className={`relative px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                isActive ? "text-dark" : "text-dark/40 hover:text-dark/70"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="chip-pill"
                  className="absolute inset-0 rounded-full bg-brand-yellow"
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                />
              )}
              <span className="relative z-10">{chip.value}</span>
            </button>
          </li>
        );

        if (isActive && subcategoryLabel) {
          return [
            chipItem,
            <li key="subcategory-chip" className="flex-shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-dark text-white text-sm font-bold whitespace-nowrap">
                {subcategoryLabel}
                <button
                  onClick={onSubcategoryRemove}
                  className="flex items-center"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </li>,
          ];
        }

        return [chipItem];
      })}
    </ul>
  );
}
