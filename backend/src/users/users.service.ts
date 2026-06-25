import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
    const NIGHT_EXPLORER_THRESHOLD = 5;
    const FOOD_HUNTER_THRESHOLD = 5;

    const visited = await this.prisma.visitedPlace.findMany({
      where: { userId },
      include: { place: { select: { category: true } } },
    });

    const placesVisited = visited.length;
    const districts = visited.filter(
      (v) => v.place.category === 'Район',
    ).length;
    const clubs = visited.filter((v) => v.place.category === 'Клуб').length;
    const restaurants = visited.filter(
      (v) => v.place.category === 'Ресторан',
    ).length;

    return {
      placesVisited,
      districts,
      isNightExplorer: clubs >= NIGHT_EXPLORER_THRESHOLD,
      isFoodHunter: restaurants >= FOOD_HUNTER_THRESHOLD,
    };
  }
}
