import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useImageSlider } from "@/shared/lib/useImageSlider";

export function CityImages({ images }: { images: Record<string, string>[] }) {
  const { onTouchStartHandler, onTouchEndHandler, current, prev, next } =
    useImageSlider(images);

  return (
    <div
      className="mx-4 rounded-2xl overflow-hidden relative h-[250px] mb-[20px]"
      onTouchStart={onTouchStartHandler}
      onTouchEnd={onTouchEndHandler}
    >
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
            src={images[current].url}
            alt={images[current].name || "Lisbon Image"}
            fill
            className="object-cover pointer-events-none"
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-3 left-3 right-3 flex gap-1 z-20">
        {images.map((_, index) => (
          <div
            key={index}
            className={`flex-1 h-[3px] rounded-full transition-all duration-300 ${
              index === current ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>

      {images[current].name && (
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 z-20">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 1C5.24 1 3 3.24 3 6C3 9.75 8 15 8 15C8 15 13 9.75 13 6C13 3.24 10.76 1 8 1ZM8 7.75C7.03 7.75 6.25 6.97 6.25 6C6.25 5.03 7.03 4.25 8 4.25C8.97 4.25 9.75 5.03 9.75 6C9.75 6.97 8.97 7.75 8 7.75Z"
              fill="white"
            />
          </svg>
          <span className="text-white text-sm font-semibold drop-shadow-md">
            {images[current].name}
          </span>
        </div>
      )}

      <button
        className="absolute inset-y-0 left-0 w-1/2 z-10"
        onClick={prev}
        aria-label="Previous"
      />
      <button
        className="absolute inset-y-0 right-0 w-1/2 z-10"
        onClick={next}
        aria-label="Next"
      />
    </div>
  );
}
