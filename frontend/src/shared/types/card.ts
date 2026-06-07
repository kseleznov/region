export interface IWorkingHours {
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
  sun: string;
}

export interface ICard {
  id?: number;
  image: string;
  photos?: string[];
  name: string;
  category: string;
  address: string;
  stars: number;
  price: number;
  isOpen: boolean;
  isSaved: boolean;
  isVisited?: boolean;
  description?: string;
  workingHours?: IWorkingHours;
}

export interface SelectedCard {
  card: ICard;
  rect: DOMRect;
}
