import { Injectable } from '@nestjs/common';
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

  findAll() {
    return this.prisma.place.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        image: true,
        stars: true,
        price: true,
        isOpen: true,
        address: true,
        isSaved: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.place.findUnique({ where: { id } });
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
}
