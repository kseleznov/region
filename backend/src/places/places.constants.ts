import type { Prisma } from '@prisma/client';
import type { Locale } from '../common/i18n';
import { localeCandidates } from '../common/i18n';
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

/** Language-neutral columns shared by list and detail responses. */
export const BASE_PLACE_SELECT = {
  id: true,
  category: true,
  image: true,
  stars: true,
  price: true,
  isOpen: true,
} as const;

/** Translation fields a list card needs. */
const LIST_TRANSLATION_FIELDS = {
  locale: true,
  name: true,
  address: true,
} as const;

/** Everything a detail view needs on top of the list fields. */
const DETAIL_TRANSLATION_FIELDS = {
  ...LIST_TRANSLATION_FIELDS,
  description: true,
  workingHours: true,
  expectations: true,
} as const;

function translationSelect(
  locale: Locale,
  fields: Prisma.PlaceTranslationSelect,
): Prisma.Place$translationsArgs {
  return {
    where: { locale: { in: localeCandidates(locale) } },
    select: fields,
  };
}

export function listPlaceSelect(locale: Locale) {
  return {
    ...BASE_PLACE_SELECT,
    translations: translationSelect(locale, LIST_TRANSLATION_FIELDS),
  } satisfies Prisma.PlaceSelect;
}

export function detailPlaceSelect(locale: Locale) {
  return {
    ...BASE_PLACE_SELECT,
    photos: true,
    ratingCount: true,
    ratingBreakdown: true,
    translations: translationSelect(locale, DETAIL_TRANSLATION_FIELDS),
  } satisfies Prisma.PlaceSelect;
}

// The selects above are built dynamically, so Prisma can't infer their payload
// shape. These describe what each query actually returns.
type PlaceScalarRow = {
  id: number;
  category: string;
  image: string;
  stars: number;
  price: number;
  isOpen: boolean;
};

type PlaceTranslationRow = {
  locale: string;
  name: string;
  address: string;
  description: string;
  workingHours: Prisma.JsonValue;
  expectations: Prisma.JsonValue;
};

export type PlaceListRow = PlaceScalarRow & {
  translations: Pick<PlaceTranslationRow, 'locale' | 'name' | 'address'>[];
};

export type PlaceDetailRow = PlaceScalarRow & {
  photos: Prisma.JsonValue;
  ratingCount: number;
  ratingBreakdown: Prisma.JsonValue;
  translations: PlaceTranslationRow[];
};
