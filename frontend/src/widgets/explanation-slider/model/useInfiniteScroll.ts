import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

export function useInfiniteScroll() {
  const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true }, [
    AutoScroll({
      speed: 1,
      startDelay: 0,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ]);

  return { emblaRef };
}
