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
      select: { ...BASE_PLACE_SELECT, description: true, workingHours: true },
    });

    if (!place) {
      throw new NotFoundException(`Place with id ${id} not found`);
    }

    if (!userId) {
      return { ...place, isSaved: false, isVisited: false };
    }

    const [saved, visited] = await Promise.all([
      this.prisma.savedPlace.findUnique({
        where: { userId_placeId: { userId, placeId: id } },
      }),
      this.prisma.visitedPlace.findUnique({
        where: { userId_placeId: { userId, placeId: id } },
      }),
    ]);

    return { ...place, isSaved: saved !== null, isVisited: visited !== null };
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
