"use client";

import { motion } from "framer-motion";
import {
  X,
  Heart,
  Star,
  Clock,
  ChevronDown,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { DAYS } from "../model/constants";
import { useCard } from "../model/useCard";
import { ImagesSlider } from "@/shared/ui/images-slider";
import { MiniMap } from "@/shared/ui/mini-map";
import type { CardDetailProps } from "../model/types";

export function CardDetail({
  card,
  sourceRect,
  isSaved,
  onClose,
  onToggleSave,
}: CardDetailProps) {
  const {
    hoursOpen,
    setHoursOpen,
    descExpanded,
    setDescExpanded,
    photos,
    isLongDesc,
    closingTime,
  } = useCard({ card });

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-center"
      initial={{ backgroundColor: "rgba(0,0,0,0)" }}
      animate={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      exit={{ backgroundColor: "rgba(0,0,0,0)" }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="fixed z-[101] bg-white overflow-hidden flex flex-col"
        initial={{
          top: sourceRect.top,
          left: sourceRect.left,
          width: sourceRect.width,
          height: sourceRect.height,
          borderRadius: 24,
        }}
        animate={{
          top: 0,
          left: 0,
          width: "100%",
          height: "100dvh",
          borderRadius: 0,
        }}
        exit={{
          top: sourceRect.top,
          left: sourceRect.left,
          width: sourceRect.width,
          height: sourceRect.height,
          borderRadius: 24,
          opacity: 0,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 280 }}
      >
        <div className="relative w-full h-[250px] flex-shrink-0 bg-dark">
          <ImagesSlider images={photos.map((url) => ({ url }))} />

          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30">
            <button
              onClick={onClose}
              aria-label="Close"
              className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform"
            >
              <X className="w-5 h-5 text-dark" strokeWidth={2.5} />
            </button>

            <button
              onClick={onToggleSave}
              aria-label={isSaved ? "Unsave" : "Save"}
              className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${isSaved ? "fill-brand-pink text-brand-pink" : "text-dark"}`}
                strokeWidth={2.5}
              />
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark/70 to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 z-20">
            <span className="inline-flex items-center gap-1.5 bg-brand-yellow text-dark text-[11px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full">
              {card.category}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden pb-32">
          <div className="px-6 pt-5 pb-6">
            <h2 className="text-[28px] leading-[1.1] font-extrabold text-dark tracking-tighter mb-3">
              {card.name}
            </h2>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-4 h-4 ${
                      index < Math.floor(card.stars)
                        ? "fill-dark text-dark"
                        : "fill-dark/15 text-dark/15"
                    }`}
                  />
                ))}
                <span className="text-sm font-bold text-dark ml-1">
                  {card.stars}
                </span>
              </div>

              <span className="text-dark/30">•</span>

              <span className="text-sm font-bold text-dark">
                {card.price > 0 ? `${card.price}€` : "Free"}
              </span>

              <span className="text-dark/30">•</span>

              <span
                className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                  card.isOpen ? "text-brand-pink" : "text-brand-pink"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    card.isOpen ? "bg-brand-pink" : "bg-brand-pink"
                  }`}
                />
                {card.isOpen
                  ? closingTime
                    ? `Open • Until ${closingTime}`
                    : "Open"
                  : "Closed"}
              </span>
            </div>

            <div className="mb-6">
              <p
                className={`text-dark/80 text-[15px] leading-relaxed font-medium ${
                  !descExpanded && isLongDesc ? "line-clamp-3" : ""
                }`}
              >
                {card.description}
              </p>
              {isLongDesc && (
                <button
                  onClick={() => setDescExpanded((e) => !e)}
                  className="mt-2 text-brand-purple font-bold text-sm"
                >
                  {descExpanded ? "Show less" : "Read more"}
                </button>
              )}
            </div>

            {card.workingHours && (
              <div className="mb-5 bg-dark/[0.03] rounded-2xl overflow-hidden">
                <button
                  onClick={() => setHoursOpen((o) => !o)}
                  className="w-full px-4 py-4 flex items-center justify-between hover:bg-dark/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand-yellow flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-dark" strokeWidth={2.5} />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-dark/50 uppercase tracking-wider">
                        Opening hours
                      </div>
                      <div className="text-sm font-bold text-dark">
                        {card.isOpen && closingTime
                          ? `Open until ${closingTime}`
                          : card.isOpen
                            ? "Open"
                            : "Closed"}
                      </div>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: hoursOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-dark/60" />
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: hoursOpen ? "auto" : 0,
                    opacity: hoursOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-1 flex flex-col gap-2">
                    {DAYS.map(([key, label]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="font-bold text-dark/70 w-12">
                          {label}
                        </span>
                        <span className="font-medium text-dark">
                          {card.workingHours?.[key]}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}

            <div>
              <div className="text-xs font-bold text-dark/50 uppercase tracking-wider mb-2 px-1">
                Location
              </div>
              <MiniMap address={card.address} />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-3 bg-gradient-to-t from-white via-white to-white/0">
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSave}
              aria-label={isSaved ? "Unsave" : "Save"}
              className={`flex-shrink-0 w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all ${
                isSaved
                  ? "bg-brand-pink border-brand-pink"
                  : "bg-white border-dark/10 hover:border-dark/30"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${isSaved ? "fill-white text-white" : "text-dark"}`}
                strokeWidth={2.5}
              />
            </button>

            <button className="flex-1 h-14 rounded-full bg-dark text-white font-bold flex items-center justify-center gap-2 hover:bg-black active:scale-[0.98] transition-all">
              <BookOpen className="w-5 h-5" strokeWidth={2.5} />
              <span>Read more</span>
              <ChevronRight className="w-5 h-5 -ml-1" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
