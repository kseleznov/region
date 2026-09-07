import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  DEFAULT_LOCALE,
  LOCALES,
  localeCandidates,
  pickTranslation,
  type Locale,
} from '../common/i18n';
import type { CreateReviewDto } from './dto/create-review.dto';

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
  rating: true,
  createdAt: true,
  user: { select: { username: true, name: true } },
  translations: {
    where: { locale: { in: localeCandidates(locale) } },
    select: { locale: true, text: true },
  },
});

type ReviewRow = {
  id: number;
  rating: number;
  createdAt: Date;
  user: { username: string; name: string };
  translations: { locale: string; text: string }[];
};

/**
 * Flatten a review row for the API: author identity comes live from the `user`
 * relation, so the client can render an initial-or-photo avatar and link to
 * the author's public profile.
 */
function toReview(row: ReviewRow, locale: Locale) {
  const { translations, user, ...rest } = row;
  return {
    ...rest,
    author: user.name,
    authorUsername: user.username,
    text: pickTranslation(translations, locale).text,
  };
}

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Add the visitor's review for a place (one per place, no later edits), then
   * fold the new rating into the place's denormalised `stars` / `ratingCount` /
   * `ratingBreakdown` so the detail view stays consistent.
   */
  async create(
    userId: number,
    placeId: number,
    dto: CreateReviewDto,
    locale: Locale = DEFAULT_LOCALE,
  ) {
    const [place, existing] = await Promise.all([
      this.prisma.place.findUnique({
        where: { id: placeId },
        select: { id: true, ratingCount: true, ratingBreakdown: true },
      }),
      this.prisma.review.findUnique({
        where: { userId_placeId: { userId, placeId } },
        select: { id: true },
      }),
    ]);

    if (!place) {
      throw new NotFoundException(`Place with id ${placeId} not found`);
    }
    if (existing) {
      throw new ConflictException('You have already reviewed this place');
    }

    const breakdown = [...(place.ratingBreakdown as unknown as number[])];
    const ratingCount = place.ratingCount + 1;
    breakdown[dto.rating - 1] += 1;

    const average = averageFromBreakdown(breakdown);
    // The visitor writes in one language; store the same text under every
    // locale so `pickTranslation` always resolves it regardless of `?lang`.
    const translations = LOCALES.map((loc) => ({
      locale: loc,
      text: dto.text,
    }));

    const review = await this.prisma.$transaction(async (tx) => {
      const saved = await tx.review.create({
        data: {
          placeId,
          userId,
          rating: dto.rating,
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
}
