import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "@/shared/i18n";
import { buildLisbonFacts } from "./facts";

export function useCityFacts() {
  const { t } = useTranslation();
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

  return {
    emblaRef,
    selectedIndex,
    scrollSnaps,
    scrollTo,
    facts: buildLisbonFacts(t),
  };
}
