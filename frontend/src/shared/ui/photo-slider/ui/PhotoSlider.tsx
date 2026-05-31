"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface PhotoSliderProps {
  photos: string[];
  alt: string;
}

export function PhotoSlider({ photos, alt }: PhotoSliderProps) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0.5, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Image
            src={photos[current]}
            alt={alt}
            fill
            className="object-cover pointer-events-none"
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>

      {photos.length > 1 && (
        <>
          <button
            className="absolute inset-y-0 left-0 w-1/2 z-10"
            onClick={(event) => {
              event.stopPropagation();
              setCurrent((c) => (c - 1 + photos.length) % photos.length);
            }}
          />
          <button
            className="absolute inset-y-0 right-0 w-1/2 z-10"
            onClick={(event) => {
              event.stopPropagation();
              setCurrent((c) => (c + 1) % photos.length);
            }}
          />

          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={(event) => {
                  event.stopPropagation();
                  setCurrent(index);
                }}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === current ? "bg-white w-7" : "bg-white/40 w-4"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
