import type { MouseEvent } from "react";
import type { ICard } from "@/shared/types/card";

export interface CardProps extends ICard {
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  className?: string;
}

export interface CardDetailProps {
  card: ICard;
  sourceRect: DOMRect;
  isSaved: boolean;
  isVisited: boolean;
  onClose: () => void;
  onToggleSave: () => void;
  onToggleVisit: () => void;
  /** Open another place (a "You might also like" card) in the same sheet. */
  onSelectSimilar: (card: ICard, rect: DOMRect) => void;
  /** Save a personal note about this place to the visitor's public tips list. */
  onAddTip: (note: string) => void;
}

export interface UseCardProps {
  card: ICard;
}
