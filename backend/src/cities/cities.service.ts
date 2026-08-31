import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { toAssetUrl } from '../common/assets.util';
import {
  DEFAULT_LOCALE,
  localeCandidates,
  pickTranslation,
  type Locale,
} from '../common/i18n';

type CityImage = { url: string; name?: string };

@Injectable()
export class CitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async findBySlug(slug: string, locale: Locale = DEFAULT_LOCALE) {
    const city = await this.prisma.city.findUnique({
      where: { slug },
      include: {
        translations: {
          where: { locale: { in: localeCandidates(locale) } },
        },
      },
    });
    if (!city) {
      throw new NotFoundException(`City "${slug}" not found`);
    }

    const { translations, ...rest } = city;
    const t = pickTranslation(translations, locale);

    return {
      ...rest,
      name: t.name,
      description: t.description,
      weather: t.weather,
      images: (city.images as CityImage[]).map((image) => ({
        ...image,
        url: toAssetUrl(image.url),
      })),
    };
  }
}
