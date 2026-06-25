import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const SUBCATEGORY_TO_PARENT: Record<string, { id: string; value: string }> = {
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

const PARENT_ORDER = ['culture', 'activities', 'nature'];

@Injectable()
export class PlacesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId?: number) {
    const places = await this.prisma.place.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        image: true,
        stars: true,
        price: true,
        isOpen: true,
        address: true,
        savedBy: userId ? { where: { userId }, select: { id: true } } : false,
        visitedBy: userId ? { where: { userId }, select: { id: true } } : false,
      },
    });

    return places.map(({ savedBy, visitedBy, ...place }) => ({
      ...place,
      isSaved: userId ? (savedBy as any[]).length > 0 : false,
      isVisited: userId ? (visitedBy as any[]).length > 0 : false,
    }));
  }

  async findOne(id: number, userId?: number) {
    const place = await this.prisma.place.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        category: true,
        image: true,
        stars: true,
        price: true,
        isOpen: true,
        address: true,
        description: true,
        workingHours: true,
        savedBy: userId ? { where: { userId }, select: { id: true } } : false,
        visitedBy: userId ? { where: { userId }, select: { id: true } } : false,
      },
    });

    if (!place) return null;

    const { savedBy, visitedBy, ...rest } = place as any;
    return {
      ...rest,
      isSaved: userId ? (savedBy as any[]).length > 0 : false,
      isVisited: userId ? (visitedBy as any[]).length > 0 : false,
    };
  }

  async getCategories() {
    const rows = await this.prisma.place.findMany({
      select: { category: true },
      distinct: ['category'],
    });

    const grouped = new Map<
      string,
      { id: string; value: string; subcategories: string[] }
    >();

    for (const { category } of rows) {
      const parent = SUBCATEGORY_TO_PARENT[category];
      if (!parent) continue;
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
    if (!place)
      throw new NotFoundException(`Place with id ${placeId} not found`);

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
    if (!place)
      throw new NotFoundException(`Place with id ${placeId} not found`);

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
