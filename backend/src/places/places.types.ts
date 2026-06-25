export type CategoryParent = {
  id: string;
  value: string;
};

export type Category = CategoryParent & {
  subcategories: string[];
};
