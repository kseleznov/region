"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function CityDescription({ description }: { description: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="mx-4 mb-[40px] bg-search-bg rounded-2xl p-4"
      onClick={() => setIsOpen((value) => !value)}
    >
      <button className="w-full flex items-center justify-between mb-3">
        <span className="text-lg font-extrabold">Обзор</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-dark" strokeWidth={2.5} />
        </motion.div>
      </button>

      <motion.div
        initial={{ height: "4.5rem" }}
        animate={{ height: isOpen ? "auto" : "4.5rem" }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-sm text-dark/70 leading-relaxed">{description}</p>
      </motion.div>
    </div>
  );
}
