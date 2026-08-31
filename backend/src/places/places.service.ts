import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { toAssetUrl } from '../common/assets.util';
import {
  BASE_PLACE_SELECT,
  PARENT_ORDER,
  SUBCATEGORY_TO_PARENT,
} from './places.constants';
import type { Category } from './places.types';
import type {
  FindPlacesQueryDto,
  PriceBucket,
} from './dto/find-places-query.dto';

// Disjoint buckets so a place lands in exactly one; the boundary values
// (10, 25) belong to the lower/upper neighbour to match the "25€ +" label.
const PRICE_BUCKET_FILTERS: Record<PriceBucket, Prisma.IntFilter | number> = {
  free: 0,
  'under-10': { gt: 0, lte: 10 },
  '10-25': { gt: 10, lt: 25 },
  'over-25': { gte: 25 },
};

function buildPlaceWhere(query: FindPlacesQueryDto): Prisma.PlaceWhereInput {
  const where: Prisma.PlaceWhereInput = {};

  if (query.price) {
    where.price = PRICE_BUCKET_FILTERS[query.price];
  }
  if (query.minRating) {
    where.stars = { gte: Number(query.minRating) };
  }
  if (query.openNow === 'true') {
    where.isOpen = true;
  }

  return where;
}

function buildPlaceOrderBy(
  sort: FindPlacesQueryDto['sort'],
): Prisma.PlaceOrderByWithRelationInput[] {
  switch (sort) {
    case 'price-low':
      return [{ price: 'asc' }, { stars: 'desc' }];
    case 'price-high':
      return [{ price: 'desc' }, { stars: 'desc' }];
    case 'top-rated':
    default:
      return [{ stars: 'desc' }, { id: 'asc' }];
  }
}

@Injectable()
export class PlacesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: FindPlacesQueryDto, userId?: number) {
    const where = buildPlaceWhere(query);
    const orderBy = buildPlaceOrderBy(query.sort);

    if (!userId) {
      const places = await this.prisma.place.findMany({
        where,
        orderBy,
        select: BASE_PLACE_SELECT,
      });
      return places.map((place) => ({
        ...place,
        image: toAssetUrl(place.image),
        isSaved: false,
        isVisited: false,
      }));
    }

    const places = await this.prisma.place.findMany({
      where,
      orderBy,
      select: {
        ...BASE_PLACE_SELECT,
        savedBy: { where: { userId }, select: { id: true } },
        visitedBy: { where: { userId }, select: { id: true } },
      },
    });

    return places.map(({ savedBy, visitedBy, ...place }) => ({
      ...place,
      image: toAssetUrl(place.image),
      isSaved: savedBy.length > 0,
      isVisited: visitedBy.length > 0,
    }));
  }

  async findOne(id: number, userId?: number) {
    const place = await this.prisma.place.findUnique({
      where: { id },
      select: {
        ...BASE_PLACE_SELECT,
        photos: true,
        description: true,
        workingHours: true,
        expectations: true,
        ratingCount: true,
        ratingBreakdown: true,
      },
    });

    if (!place) {
      throw new NotFoundException(`Place with id ${id} not found`);
    }

    const { ratingCount, ratingBreakdown, ...rest } = place;

    // "You might also like" — places in the same parent group (Culture, Nature…),
    // falling back to the exact category if the group can't be resolved.
    const parentId = SUBCATEGORY_TO_PARENT[rest.category]?.id;
    const siblingCategories = parentId
      ? Object.entries(SUBCATEGORY_TO_PARENT)
          .filter(([, parent]) => parent.id === parentId)
          .map(([category]) => category)
      : [rest.category];

    const [reviews, similar] = await Promise.all([
      this.prisma.review.findMany({
        where: { placeId: id },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          author: true,
          avatar: true,
          rating: true,
          text: true,
          createdAt: true,
        },
      }),
      this.prisma.place.findMany({
        where: { category: { in: siblingCategories }, id: { not: id } },
        take: 6,
        select: BASE_PLACE_SELECT,
      }),
    ]);

    const detail = {
      ...rest,
      image: toAssetUrl(rest.image),
      photos: (rest.photos as string[]).map(toAssetUrl),
      reviews,
      similar: similar.map((item) => ({
        ...item,
        image: toAssetUrl(item.image),
        isSaved: false,
        isVisited: false,
      })),
      ratingSummary: {
        average: rest.stars,
        total: ratingCount,
        breakdown: ratingBreakdown as unknown as number[],
      },
    };

    if (!userId) {
      return { ...detail, isSaved: false, isVisited: false };
    }

    const [saved, visited] = await Promise.all([
      this.prisma.savedPlace.findUnique({
        where: { userId_placeId: { userId, placeId: id } },
      }),
      this.prisma.visitedPlace.findUnique({
        where: { userId_placeId: { userId, placeId: id } },
      }),
    ]);

    return { ...detail, isSaved: saved !== null, isVisited: visited !== null };
  }

  async getCategories() {
    const rows = await this.prisma.place.findMany({
      select: { category: true },
      distinct: ['category'],
    });

    const grouped = new Map<string, Category>();

    for (const { category } of rows) {
      const parent = SUBCATEGORY_TO_PARENT[category];
      if (!parent) {
        continue;
      }
      if (!grouped.has(parent.id)) {
        grouped.set(parent.id, {
          id: parent.id,
          value: parent.value,
          subcategories: [],
        });
      }
      grouped.get(parent.id)!.subcategories.push(category);
    }

    const sorted = PARENT_ORDER.filter((id) => grouped.has(id)).map(
      (id) => grouped.get(id)!,
    );

    return [{ id: 'all', value: 'All', subcategories: [] }, ...sorted];
  }

  async toggleVisit(placeId: number, userId: number) {
    const place = await this.prisma.place.findUnique({
      where: { id: placeId },
    });
    if (!place) {
      throw new NotFoundException(`Place with id ${placeId} not found`);
    }

    const existing = await this.prisma.visitedPlace.findUnique({
      where: { userId_placeId: { userId, placeId } },
    });

    if (existing) {
      await this.prisma.visitedPlace.delete({ where: { id: existing.id } });
      return { isVisited: false };
    }

    await this.prisma.visitedPlace.create({ data: { userId, placeId } });
    return { isVisited: true };
  }

  async toggleSave(placeId: number, userId: number) {
    const place = await this.prisma.place.findUnique({
      where: { id: placeId },
    });
    if (!place) {
      throw new NotFoundException(`Place with id ${placeId} not found`);
    }

    const existing = await this.prisma.savedPlace.findUnique({
      where: { userId_placeId: { userId, placeId } },
    });

    if (existing) {
      await this.prisma.savedPlace.delete({ where: { id: existing.id } });
      return { isSaved: false };
    }

    await this.prisma.savedPlace.create({ data: { userId, placeId } });
    return { isSaved: true };
  }
}
