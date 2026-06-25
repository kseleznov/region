import type { CategoryParent } from './places.types';

export const SUBCATEGORY_TO_PARENT: Record<string, CategoryParent> = {
  Музей: { id: 'culture', value: 'Culture' },
  Замок: { id: 'culture', value: 'Culture' },
  Монастырь: { id: 'culture', value: 'Culture' },
  Памятник: { id: 'culture', value: 'Culture' },
  Достопримечательность: { id: 'culture', value: 'Culture' },
  Площадь: { id: 'culture', value: 'Culture' },
  Район: { id: 'culture', value: 'Culture' },
  Океанариум: { id: 'activities', value: 'Activities' },
  'Смотровая площадка': { id: 'nature', value: 'Nature' },
};

export const PARENT_ORDER = ['culture', 'activities', 'nature'];

export const BASE_PLACE_SELECT = {
  id: true,
  name: true,
  category: true,
  image: true,
  stars: true,
  price: true,
  isOpen: true,
  address: true,
} as const;
