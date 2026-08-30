import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  BASE_PLACE_SELECT,
  PARENT_ORDER,
  SUBCATEGORY_TO_PARENT,
} from './places.constants';
import type { Category } from './places.types';

@Injectable()
export class PlacesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId?: number) {
    if (!userId) {
      const places = await this.prisma.place.findMany({
        select: BASE_PLACE_SELECT,
      });
      return places.map((place) => ({
        ...place,
        isSaved: false,
        isVisited: false,
      }));
    }

    const places = await this.prisma.place.findMany({
      select: {
        ...BASE_PLACE_SELECT,
        savedBy: { where: { userId }, select: { id: true } },
        visitedBy: { where: { userId }, select: { id: true } },
      },
    });

    return places.map(({ savedBy, visitedBy, ...place }) => ({
      ...place,
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
      reviews,
      similar: similar.map((item) => ({
        ...item,
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
