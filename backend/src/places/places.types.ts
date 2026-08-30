export type CategoryParent = {
  id: string;
  value: string;
};

export type Category = CategoryParent & {
  subcategories: string[];
};

export type Expectation = {
  icon: string;
  label: string;
  note?: string;
};

export type Review = {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  createdAt: Date;
};

export type RatingSummary = {
  average: number;
  total: number;
  /** Counts for 1★ … 5★ — `breakdown[0]` is 1★, `breakdown[4]` is 5★. */
  breakdown: number[];
};
