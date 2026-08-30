export interface IWorkingHours {
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
  sun: string;
}

export interface Expectation {
  icon: string;
  label: string;
  note?: string;
}

export interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  createdAt: string;
}

export interface RatingSummary {
  average: number;
  total: number;
  /** Counts for 1★ … 5★ — `breakdown[0]` is 1★, `breakdown[4]` is 5★. */
  breakdown: number[];
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
  // Detail-only — populated by `GET /places/:id`, absent in list responses.
  expectations?: Expectation[];
  reviews?: Review[];
  ratingSummary?: RatingSummary;
  similar?: ICard[];
}

export interface SelectedCard {
  card: ICard;
  rect: DOMRect;
}
