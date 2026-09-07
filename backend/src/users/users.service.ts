import {
  BadRequestException,
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
import { PLACE_CATEGORIES, PROGRESS_THRESHOLDS } from './users.constants';
import { generateUniqueUsername } from './username.util';
import type { UpdateMeDto } from './dto/update-me.dto';

interface CityGroup {
  citySlug: string;
  cityName: string;
  placesVisited: number;
  clubs: number;
  restaurants: number;
  districts: number;
  tips: {
    id: number;
    placeId: number;
    placeName: string;
    placeImage: string;
    category: string;
    note: string;
  }[];
  visited: { placeId: number; placeName: string; placeImage: string }[];
}

type TranslatedCity = {
  slug: string;
  translations: { locale: string; name: string }[];
};
type TranslatedPlace = {
  id: number;
  category: string;
  image: string;
  cityId: number;
  city: TranslatedCity;
  translations: { locale: string; name: string }[];
};

const publicSelfSelect = {
  id: true,
  email: true,
  name: true,
  username: true,
  bio: true,
} as const;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  create(email: string, password: string, name: string, username: string) {
    return this.prisma.user.create({
      data: { email, password, name, username },
    });
  }

  generateUsername(email: string) {
    return generateUniqueUsername(this.prisma, email);
  }

  updateRefreshToken(id: number, refreshToken: string | null) {
    return this.prisma.user.update({ where: { id }, data: { refreshToken } });
  }

  getPublicSelf(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: publicSelfSelect,
    });
  }

  updateMe(userId: number, dto: UpdateMeDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(dto.name !== undefined ? { name: dto.name } : {}),
        ...(dto.bio !== undefined ? { bio: dto.bio } : {}),
      },
      select: publicSelfSelect,
    });
  }

  async getProgress(userId: number) {
    const visited = await this.prisma.visitedPlace.findMany({
      where: { userId },
      include: { place: { select: { category: true } } },
    });

    const placesVisited = visited.length;
    const districts = visited.filter(
      (v) => v.place.category === PLACE_CATEGORIES.DISTRICT,
    ).length;
    const clubs = visited.filter(
      (v) => v.place.category === PLACE_CATEGORIES.CLUB,
    ).length;
    const restaurants = visited.filter(
      (v) => v.place.category === PLACE_CATEGORIES.RESTAURANT,
    ).length;

    return {
      placesVisited,
      districts,
      isNightExplorer: clubs >= PROGRESS_THRESHOLDS.NIGHT_EXPLORER,
      isFoodHunter: restaurants >= PROGRESS_THRESHOLDS.FOOD_HUNTER,
    };
  }

  async toggleFollow(followerId: number, targetUsername: string) {
    const target = await this.prisma.user.findUnique({
      where: { username: targetUsername },
    });
    if (!target) {
      throw new NotFoundException(`User "${targetUsername}" not found`);
    }
    if (target.id === followerId) {
      throw new BadRequestException("You can't follow yourself");
    }

    const existing = await this.prisma.follow.findUnique({
      where: {
        followerId_followingId: { followerId, followingId: target.id },
      },
    });

    if (existing) {
      await this.prisma.follow.delete({ where: { id: existing.id } });
    } else {
      await this.prisma.follow.create({
        data: { followerId, followingId: target.id },
      });
    }

    const followersCount = await this.prisma.follow.count({
      where: { followingId: target.id },
    });

    return { isFollowing: !existing, followersCount };
  }

  async getFollowers(userId: number) {
    const rows = await this.prisma.follow.findMany({
      where: { followingId: userId },
      include: {
        follower: { select: { id: true, username: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((row) => row.follower);
  }

  async getFollowing(userId: number) {
    const rows = await this.prisma.follow.findMany({
      where: { followerId: userId },
      include: {
        following: { select: { id: true, username: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((row) => row.following);
  }

  async getPublicProfile(
    username: string,
    viewerId: number | undefined,
    locale: Locale = DEFAULT_LOCALE,
  ) {
    const target = await this.prisma.user.findUnique({
      where: { username },
      select: { id: true, username: true, name: true, bio: true },
    });
    if (!target) {
      throw new NotFoundException(`User "${username}" not found`);
    }

    const placeSelect = {
      id: true,
      category: true,
      image: true,
      cityId: true,
      city: {
        select: {
          slug: true,
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
    } as const;

    const [followersCount, followingCount, isFollowing, visited, tips] =
      await Promise.all([
        this.prisma.follow.count({ where: { followingId: target.id } }),
        this.prisma.follow.count({ where: { followerId: target.id } }),
        viewerId && viewerId !== target.id
          ? this.prisma.follow
              .findUnique({
                where: {
                  followerId_followingId: {
                    followerId: viewerId,
                    followingId: target.id,
                  },
                },
              })
              .then((row) => row !== null)
          : Promise.resolve(false),
        this.prisma.visitedPlace.findMany({
          where: { userId: target.id },
          include: { place: { select: placeSelect } },
        }) as Promise<{ place: TranslatedPlace }[]>,
        this.prisma.tip.findMany({
          where: { userId: target.id },
          include: { place: { select: placeSelect } },
          orderBy: { createdAt: 'desc' },
        }) as unknown as Promise<
          { id: number; note: string; place: TranslatedPlace }[]
        >,
      ]);

    const groups = new Map<number, CityGroup>();

    const groupFor = (place: TranslatedPlace): CityGroup => {
      let group = groups.get(place.cityId);
      if (!group) {
        const cityTranslation = pickTranslation(
          place.city.translations,
          locale,
        );
        group = {
          citySlug: place.city.slug,
          cityName: cityTranslation.name,
          placesVisited: 0,
          clubs: 0,
          restaurants: 0,
          districts: 0,
          tips: [],
          visited: [],
        };
        groups.set(place.cityId, group);
      }
      return group;
    };

    for (const { place } of visited) {
      const group = groupFor(place);
      group.placesVisited += 1;
      if (place.category === PLACE_CATEGORIES.DISTRICT) group.districts += 1;
      if (place.category === PLACE_CATEGORIES.CLUB) group.clubs += 1;
      if (place.category === PLACE_CATEGORIES.RESTAURANT)
        group.restaurants += 1;

      const placeTranslation = pickTranslation(place.translations, locale);
      group.visited.push({
        placeId: place.id,
        placeName: placeTranslation.name,
        placeImage: toAssetUrl(place.image),
      });
    }

    for (const tip of tips) {
      const group = groupFor(tip.place);
      const placeTranslation = pickTranslation(tip.place.translations, locale);
      group.tips.push({
        id: tip.id,
        placeId: tip.place.id,
        placeName: placeTranslation.name,
        placeImage: toAssetUrl(tip.place.image),
        category: tip.place.category,
        note: tip.note,
      });
    }

    const cities = Array.from(groups.values()).map(
      ({ clubs, restaurants, ...rest }) => ({
        ...rest,
        isNightExplorer: clubs >= PROGRESS_THRESHOLDS.NIGHT_EXPLORER,
        isFoodHunter: restaurants >= PROGRESS_THRESHOLDS.FOOD_HUNTER,
      }),
    );

    return {
      id: target.id,
      username: target.username,
      name: target.name,
      bio: target.bio,
      followersCount,
      followingCount,
      isFollowing,
      cities,
    };
  }
}
