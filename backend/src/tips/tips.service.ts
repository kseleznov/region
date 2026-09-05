import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { toAssetUrl } from '../common/assets.util';
import {
  DEFAULT_LOCALE,
  localeCandidates,
  pickTranslation,
  type Locale,
} from '../common/i18n';
import type { CreateTipDto } from './dto/create-tip.dto';

const tipInclude = (locale: Locale) => ({
  place: {
    select: {
      category: true,
      image: true,
      city: {
        select: {
          translations: {
            where: { locale: { in: localeCandidates(locale) } },
            select: { locale: true, name: true },
          },
        },
      },
      translations: {
        where: { locale: { in: localeCandidates(locale) } },
        select: { locale: true, name: true },
      },
    },
  },
});

type TipRow = {
  id: number;
  note: string;
  place: {
    category: string;
    image: string;
    city: { translations: { locale: string; name: string }[] };
    translations: { locale: string; name: string }[];
  };
};

function toMyTip(tip: TipRow, locale: Locale) {
  const placeTranslation = pickTranslation(tip.place.translations, locale);
  const cityTranslation = pickTranslation(tip.place.city.translations, locale);

  return {
    id: tip.id,
    placeName: placeTranslation.name,
    placeImage: toAssetUrl(tip.place.image),
    category: tip.place.category,
    cityName: cityTranslation.name,
    note: tip.note,
  };
}

@Injectable()
export class TipsService {
  constructor(private readonly prisma: PrismaService) {}

  async findMine(userId: number, locale: Locale = DEFAULT_LOCALE) {
    const tips = (await this.prisma.tip.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: tipInclude(locale),
    })) as TipRow[];

    return tips.map((tip) => toMyTip(tip, locale));
  }

  async create(
    userId: number,
    dto: CreateTipDto,
    locale: Locale = DEFAULT_LOCALE,
  ) {
    const place = await this.prisma.place.findUnique({
      where: { id: dto.placeId },
    });
    if (!place) {
      throw new NotFoundException(`Place with id ${dto.placeId} not found`);
    }

    const tip = (await this.prisma.tip.upsert({
      where: { userId_placeId: { userId, placeId: dto.placeId } },
      update: { note: dto.note },
      create: { userId, placeId: dto.placeId, note: dto.note },
      include: tipInclude(locale),
    })) as TipRow;

    return toMyTip(tip, locale);
  }

  async update(
    userId: number,
    tipId: number,
    note: string,
    locale: Locale = DEFAULT_LOCALE,
  ) {
    const existing = await this.prisma.tip.findUnique({ where: { id: tipId } });
    if (!existing) {
      throw new NotFoundException(`Tip with id ${tipId} not found`);
    }
    if (existing.userId !== userId) {
      throw new ForbiddenException("You can't edit someone else's tip");
    }

    const tip = (await this.prisma.tip.update({
      where: { id: tipId },
      data: { note },
      include: tipInclude(locale),
    })) as TipRow;

    return toMyTip(tip, locale);
  }

  async remove(userId: number, tipId: number) {
    const existing = await this.prisma.tip.findUnique({ where: { id: tipId } });
    if (!existing) {
      throw new NotFoundException(`Tip with id ${tipId} not found`);
    }
    if (existing.userId !== userId) {
      throw new ForbiddenException("You can't delete someone else's tip");
    }

    await this.prisma.tip.delete({ where: { id: tipId } });
    return { id: tipId };
  }
}
