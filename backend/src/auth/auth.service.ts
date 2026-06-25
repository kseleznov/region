import { Injectable, ConflictException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;
    const { password: _, ...result } = user;
    return result;
  }

  async register(email: string, password: string, name: string) {
    const existing = await this.usersService.findByEmail(email);
    if (existing) throw new ConflictException('Email already in use');
    const hash = await bcrypt.hash(password, 10);
    const user = await this.usersService.create(email, hash, name);
    const tokens = await this.getTokens(user.id, user.email, user.name);
    await this.storeRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async login(userId: number, email: string, name: string) {
    const tokens = await this.getTokens(userId, email, name);
    await this.storeRefreshToken(userId, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: number) {
    await this.usersService.updateRefreshToken(userId, null);
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.refreshToken) throw new ForbiddenException();
    const match = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!match) throw new ForbiddenException();
    const tokens = await this.getTokens(user.id, user.email, user.name);
    await this.storeRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  private async getTokens(userId: number, email: string, name: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email, name },
        { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '15m' },
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' },
      ),
    ]);
    return { accessToken, refreshToken };
  }

  private async storeRefreshToken(userId: number, refreshToken: string) {
    const hashed = await bcrypt.hash(refreshToken, 10);
    await this.usersService.updateRefreshToken(userId, hashed);
  }
}
