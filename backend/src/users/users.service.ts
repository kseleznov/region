import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PLACE_CATEGORIES, PROGRESS_THRESHOLDS } from './users.constants';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  create(email: string, password: string, name: string) {
    return this.prisma.user.create({ data: { email, password, name } });
  }

  updateRefreshToken(id: number, refreshToken: string | null) {
    return this.prisma.user.update({ where: { id }, data: { refreshToken } });
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
}
