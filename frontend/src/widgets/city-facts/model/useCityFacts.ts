import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { lisbonFacts } from "./facts";

export function useCityFacts() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollSnaps = emblaApi?.scrollSnapList() ?? [];

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    const api = emblaApi;

    if (!api) {
      return;
    }

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  function scrollTo(index: number) {
    emblaApi?.scrollTo(index);
  }

  return { emblaRef, selectedIndex, scrollSnaps, scrollTo, facts: lisbonFacts };
}
