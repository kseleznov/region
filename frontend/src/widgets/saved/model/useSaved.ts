import { usePlaces } from "@/entities/place";

export function useSaved() {
  const { data: allCards = [] } = usePlaces();
  const savedCards = allCards.filter((card) => card.isSaved);

  return { savedCards };
}
