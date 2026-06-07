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
}

export interface UseCardProps {
  card: ICard;
}
