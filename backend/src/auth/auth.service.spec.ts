import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');
const bcryptMock = bcrypt as jest.Mocked<typeof bcrypt>;

describe('AuthService', () => {
  let service: AuthService;
  let usersService: {
    findByEmail: jest.Mock;
    findById: jest.Mock;
    create: jest.Mock;
    updateRefreshToken: jest.Mock;
  };
  let jwtService: { signAsync: jest.Mock };

  beforeEach(async () => {
    usersService = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      updateRefreshToken: jest.fn(),
    };
    jwtService = { signAsync: jest.fn().mockResolvedValue('token') };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('validateUser', () => {
    it('returns user without password when credentials are valid', async () => {
      const user = { id: 1, email: 'a@a.com', password: 'hash', name: 'Alice', refreshToken: null };
      usersService.findByEmail.mockResolvedValue(user);
      (bcryptMock.compare as jest.Mock).mockResolvedValue(true);
      const result = await service.validateUser('a@a.com', 'password');
      expect(result).toEqual({ id: 1, email: 'a@a.com', name: 'Alice', refreshToken: null });
      expect(result).not.toHaveProperty('password');
    });

    it('returns null when user not found', async () => {
      usersService.findByEmail.mockResolvedValue(null);
      expect(await service.validateUser('x@x.com', 'password')).toBeNull();
    });

    it('returns null when password does not match', async () => {
      usersService.findByEmail.mockResolvedValue({ id: 1, password: 'hash' });
      (bcryptMock.compare as jest.Mock).mockResolvedValue(false);
      expect(await service.validateUser('a@a.com', 'wrong')).toBeNull();
    });
  });

  describe('register', () => {
    it('throws ConflictException when email already exists', async () => {
      usersService.findByEmail.mockResolvedValue({ id: 1, email: 'a@a.com' });
      await expect(service.register('a@a.com', 'pass', 'Alice')).rejects.toThrow(ConflictException);
    });

    it('returns tokens on successful registration', async () => {
      usersService.findByEmail.mockResolvedValue(null);
      (bcryptMock.hash as jest.Mock).mockResolvedValue('hashed_pass');
      usersService.create.mockResolvedValue({ id: 1, email: 'a@a.com', name: 'Alice' });
      usersService.updateRefreshToken.mockResolvedValue(undefined);
      jwtService.signAsync.mockResolvedValue('signed_token');
      const result = await service.register('a@a.com', 'pass', 'Alice');
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
    });
  });

  describe('refreshTokens', () => {
    it('throws ForbiddenException when user has no refresh token', async () => {
      usersService.findById.mockResolvedValue({ id: 1, refreshToken: null });
      await expect(service.refreshTokens(1, 'token')).rejects.toThrow(ForbiddenException);
    });

    it('throws ForbiddenException when token does not match stored hash', async () => {
      usersService.findById.mockResolvedValue({ id: 1, email: 'a@a.com', refreshToken: 'stored_hash' });
      (bcryptMock.compare as jest.Mock).mockResolvedValue(false);
      await expect(service.refreshTokens(1, 'wrong_token')).rejects.toThrow(ForbiddenException);
    });

    it('returns new tokens when refresh token is valid', async () => {
      usersService.findById.mockResolvedValue({ id: 1, email: 'a@a.com', name: 'Alice', refreshToken: 'stored_hash' });
      (bcryptMock.compare as jest.Mock).mockResolvedValue(true);
      usersService.updateRefreshToken.mockResolvedValue(undefined);
      jwtService.signAsync.mockResolvedValue('new_token');
      (bcryptMock.hash as jest.Mock).mockResolvedValue('new_hash');
      const result = await service.refreshTokens(1, 'valid_token');
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
    });
  });

  describe('logout', () => {
    it('calls updateRefreshToken with null', async () => {
      usersService.updateRefreshToken.mockResolvedValue(undefined);
      await service.logout(1);
      expect(usersService.updateRefreshToken).toHaveBeenCalledWith(1, null);
    });
  });
});
