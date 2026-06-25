import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersService', () => {
  let service: UsersService;
  let prismaMock: {
    user: {
      findUnique: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
    };
    visitedPlace: {
      findMany: jest.Mock;
    };
  };

  beforeEach(async () => {
    prismaMock = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      visitedPlace: {
        findMany: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('findByEmail returns user when found', async () => {
    const user = { id: 1, email: 'a@a.com', password: 'hash', name: 'Alice', refreshToken: null };
    prismaMock.user.findUnique.mockResolvedValue(user);
    expect(await service.findByEmail('a@a.com')).toEqual(user);
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({ where: { email: 'a@a.com' } });
  });

  it('findByEmail returns null when not found', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);
    expect(await service.findByEmail('missing@a.com')).toBeNull();
  });

  it('findById returns user when found', async () => {
    const user = { id: 1, email: 'a@a.com', password: 'hash', name: 'Alice', refreshToken: null };
    prismaMock.user.findUnique.mockResolvedValue(user);
    expect(await service.findById(1)).toEqual(user);
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('create creates a new user', async () => {
    const user = { id: 1, email: 'a@a.com', password: 'hash', name: 'Alice', refreshToken: null };
    prismaMock.user.create.mockResolvedValue(user);
    expect(await service.create('a@a.com', 'hash', 'Alice')).toEqual(user);
    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: { email: 'a@a.com', password: 'hash', name: 'Alice' },
    });
  });

  it('updateRefreshToken calls update with given values', async () => {
    prismaMock.user.update.mockResolvedValue({});
    await service.updateRefreshToken(1, 'hashed');
    expect(prismaMock.user.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { refreshToken: 'hashed' },
    });
  });

  it('updateRefreshToken accepts null to clear token', async () => {
    prismaMock.user.update.mockResolvedValue({});
    await service.updateRefreshToken(1, null);
    expect(prismaMock.user.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { refreshToken: null },
    });
  });

  describe('getProgress', () => {
    it('returns all zeros for a user with no visited places', async () => {
      prismaMock.visitedPlace.findMany.mockResolvedValue([]);
      const result = await service.getProgress(1);
      expect(result).toEqual({
        placesVisited: 0,
        districts: 0,
        isNightExplorer: false,
        isFoodHunter: false,
      });
    });

    it('counts total placesVisited', async () => {
      prismaMock.visitedPlace.findMany.mockResolvedValue([
        { place: { category: 'Музей' } },
        { place: { category: 'Замок' } },
      ]);
      const result = await service.getProgress(1);
      expect(result.placesVisited).toBe(2);
    });

    it('counts only "Район" category places as districts', async () => {
      prismaMock.visitedPlace.findMany.mockResolvedValue([
        { place: { category: 'Район' } },
        { place: { category: 'Район' } },
        { place: { category: 'Музей' } },
      ]);
      const result = await service.getProgress(1);
      expect(result.districts).toBe(2);
    });

    it('sets isNightExplorer true when 5 or more "Клуб" places visited', async () => {
      const clubs = Array.from({ length: 5 }, () => ({ place: { category: 'Клуб' } }));
      prismaMock.visitedPlace.findMany.mockResolvedValue(clubs);
      const result = await service.getProgress(1);
      expect(result.isNightExplorer).toBe(true);
    });

    it('sets isNightExplorer false when fewer than 5 "Клуб" places visited', async () => {
      const clubs = Array.from({ length: 4 }, () => ({ place: { category: 'Клуб' } }));
      prismaMock.visitedPlace.findMany.mockResolvedValue(clubs);
      const result = await service.getProgress(1);
      expect(result.isNightExplorer).toBe(false);
    });

    it('sets isFoodHunter true when 5 or more "Ресторан" places visited', async () => {
      const restaurants = Array.from({ length: 5 }, () => ({ place: { category: 'Ресторан' } }));
      prismaMock.visitedPlace.findMany.mockResolvedValue(restaurants);
      const result = await service.getProgress(1);
      expect(result.isFoodHunter).toBe(true);
    });

    it('sets isFoodHunter false when fewer than 5 "Ресторан" places visited', async () => {
      const restaurants = Array.from({ length: 3 }, () => ({ place: { category: 'Ресторан' } }));
      prismaMock.visitedPlace.findMany.mockResolvedValue(restaurants);
      const result = await service.getProgress(1);
      expect(result.isFoodHunter).toBe(false);
    });
  });
});
