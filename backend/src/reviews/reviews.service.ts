import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  DEFAULT_LOCALE,
  LOCALES,
  localeCandidates,
  pickTranslation,
  type Locale,
} from '../common/i18n';
import type { UpsertReviewDto } from './dto/upsert-review.dto';

/** i.pravatar returns a stable image for a stable `u` value, so a visitor's
 *  avatar stays the same across their reviews without us storing files. */
function avatarForUser(userId: number): string {
  return `https://i.pravatar.cc/120?u=region-user-${userId}`;
}

/** Weighted mean of a 1★…5★ histogram, rounded to one decimal (`0` when empty). */
function averageFromBreakdown(breakdown: number[]): number {
  const total = breakdown.reduce((sum, count) => sum + count, 0);
  if (total === 0) {
    return 0;
  }
  const weighted = breakdown.reduce(
    (sum, count, index) => sum + count * (index + 1),
    0,
  );
  return Math.round((weighted / total) * 10) / 10;
}

const reviewSelect = (locale: Locale) => ({
  id: true,
  author: true,
  avatar: true,
  rating: true,
  createdAt: true,
  translations: {
    where: { locale: { in: localeCandidates(locale) } },
    select: { locale: true, text: true },
  },
});

type ReviewRow = {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  createdAt: Date;
  translations: { locale: string; text: string }[];
};

function toReview(row: ReviewRow, locale: Locale) {
  const { translations, ...rest } = row;
  return { ...rest, text: pickTranslation(translations, locale).text };
}

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create or replace the visitor's single review for a place, then fold the
   * new rating into the place's denormalised `stars` / `ratingCount` /
   * `ratingBreakdown` so the detail view stays consistent.
   */
  async upsert(
    userId: number,
    placeId: number,
    dto: UpsertReviewDto,
    locale: Locale = DEFAULT_LOCALE,
  ) {
    const [place, user, existing] = await Promise.all([
      this.prisma.place.findUnique({
        where: { id: placeId },
        select: { id: true, ratingCount: true, ratingBreakdown: true },
      }),
      this.prisma.user.findUnique({
        where: { id: userId },
        select: { name: true },
      }),
      this.prisma.review.findUnique({
        where: { userId_placeId: { userId, placeId } },
        select: { id: true, rating: true },
      }),
    ]);

    if (!place) {
      throw new NotFoundException(`Place with id ${placeId} not found`);
    }
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const breakdown = [...(place.ratingBreakdown as unknown as number[])];
    let ratingCount = place.ratingCount;

    if (existing) {
      breakdown[existing.rating - 1] = Math.max(
        0,
        breakdown[existing.rating - 1] - 1,
      );
    } else {
      ratingCount += 1;
    }
    breakdown[dto.rating - 1] += 1;

    const average = averageFromBreakdown(breakdown);
    // The visitor writes in one language; store the same text under every
    // locale so `pickTranslation` always resolves it, matching the seed shape.
    const translations = LOCALES.map((loc) => ({
      locale: loc,
      text: dto.text,
    }));

    const review = await this.prisma.$transaction(async (tx) => {
      const saved = existing
        ? await tx.review.update({
            where: { id: existing.id },
            data: {
              rating: dto.rating,
              author: user.name,
              avatar: avatarForUser(userId),
              createdAt: new Date(),
              translations: { deleteMany: {}, create: translations },
            },
            select: reviewSelect(locale),
          })
        : await tx.review.create({
            data: {
              placeId,
              userId,
              rating: dto.rating,
              author: user.name,
              avatar: avatarForUser(userId),
              translations: { create: translations },
            },
            select: reviewSelect(locale),
          });

      await tx.place.update({
        where: { id: placeId },
        data: { stars: average, ratingCount, ratingBreakdown: breakdown },
      });

      return saved;
    });

    return {
      review: toReview(review, locale),
      ratingSummary: { average, total: ratingCount, breakdown },
      stars: average,
    };
  }

  /** Delete the visitor's review and pull its rating back out of the totals. */
  async removeMine(userId: number, placeId: number) {
    const existing = await this.prisma.review.findUnique({
      where: { userId_placeId: { userId, placeId } },
      select: { id: true, rating: true },
    });
    if (!existing) {
      throw new NotFoundException('You have no review for this place');
    }

    const place = await this.prisma.place.findUniqueOrThrow({
      where: { id: placeId },
      select: { ratingCount: true, ratingBreakdown: true },
    });

    const breakdown = [...(place.ratingBreakdown as unknown as number[])];
    breakdown[existing.rating - 1] = Math.max(
      0,
      breakdown[existing.rating - 1] - 1,
    );
    const ratingCount = Math.max(0, place.ratingCount - 1);
    const average = averageFromBreakdown(breakdown);

    await this.prisma.$transaction([
      this.prisma.review.delete({ where: { id: existing.id } }),
      this.prisma.place.update({
        where: { id: placeId },
        data: { stars: average, ratingCount, ratingBreakdown: breakdown },
      }),
    ]);

    return {
      ratingSummary: { average, total: ratingCount, breakdown },
      stars: average,
    };
  }
}
