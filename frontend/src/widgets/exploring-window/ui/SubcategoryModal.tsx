"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface SubcategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
  subcategories: string[];
  activeSubcategory: string | null;
  onApply: (subcategory: string | null) => void;
}

export function SubcategoryModal({
  isOpen,
  onClose,
  categoryName,
  subcategories,
  activeSubcategory,
  onApply,
}: SubcategoryModalProps) {
  const [pending, setPending] = useState<string | null>(activeSubcategory);

  useEffect(() => {
    if (isOpen) setPending(activeSubcategory);
  }, [isOpen]);

  if (!isOpen) return null;

  function handleApply() {
    onApply(pending);
    onClose();
  }

  function handleReset() {
    setPending(null);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center z-51">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-[500px] rounded-t-3xl bg-white px-6 pb-8 pt-5">
        <div className="absolute left-1/2 top-3 h-1 w-10 -translate-x-1/2 rounded-full bg-gray-200" />

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-dark">{categoryName}</h2>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100"
          >
            <X className="h-5 w-5 text-dark" />
          </button>
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-gray">
          Subcategory
        </p>
        <div className="mb-8 grid grid-cols-2 gap-2">
          {subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setPending((prev) => (prev === sub ? null : sub))}
              className={`rounded-full border px-4 py-2.5 text-sm font-bold transition-colors ${
                pending === sub
                  ? "border-brand-yellow bg-brand-yellow text-dark"
                  : "border-gray-200 bg-white text-dark"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 rounded-full border border-gray-200 py-4 text-sm font-bold text-dark"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="flex-[2] rounded-full bg-brand-yellow py-4 text-sm font-bold text-dark"
          >
            Show results
          </button>
        </div>
      </div>
    </div>
  );
}
