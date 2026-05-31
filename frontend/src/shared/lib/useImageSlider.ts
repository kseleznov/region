import { useRef, useState } from "react";
import type { SliderImage } from "../ui/images-slider/types";

export function useImageSlider(images: SliderImage[]) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  function onTouchEndHandler(event: React.TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null) {
      return;
    }

    const delta = event.changedTouches[0].clientX - touchStartX.current;

    if (delta > 40) {
      prev();
    }

    if (delta < -40) {
      next();
    }

    touchStartX.current = null;
  }

  function onTouchStartHandler(event: React.TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.touches[0].clientX;
  }

  return {
    current,
    onTouchEndHandler,
    onTouchStartHandler,
    prev,
    next,
  };
}
