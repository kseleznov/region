import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { toAssetUrl } from '../common/assets.util';

type CityImage = { url: string; name?: string };

@Injectable()
export class CitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async findBySlug(slug: string) {
    const city = await this.prisma.city.findUnique({ where: { slug } });
    if (!city) {
      throw new NotFoundException(`City "${slug}" not found`);
    }
    return {
      ...city,
      images: (city.images as CityImage[]).map((image) => ({
        ...image,
        url: toAssetUrl(image.url),
      })),
    };
  }
}
