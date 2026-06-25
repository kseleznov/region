import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  Res,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import type { AuthTokens, JwtRefreshUser, JwtUser } from './auth.types';
import { RegisterDto } from './dto/register.dto';
import { LocalGuard } from './guards/local.guard';
import { JwtGuard } from './guards/jwt.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.register(
      dto.email,
      dto.password,
      dto.name,
    );
    this.setTokenCookies(res, tokens);
    return { message: 'Registered' };
  }

  @UseGuards(LocalGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { id, email, name } = req.user as JwtUser;
    const tokens = await this.authService.login(id, email, name);
    this.setTokenCookies(res, tokens);
    return { message: 'Logged in' };
  }

  @UseGuards(JwtGuard)
  @Post('logout')
  @HttpCode(200)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { id } = req.user as JwtUser;
    await this.authService.logout(id);
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return { message: 'Logged out' };
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(200)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { id, refreshToken } = req.user as JwtRefreshUser;
    const tokens = await this.authService.refreshTokens(id, refreshToken);
    this.setTokenCookies(res, tokens);
    return { message: 'Tokens refreshed' };
  }

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@Req() req: Request) {
    return req.user;
  }

  private setTokenCookies(res: Response, tokens: AuthTokens) {
    const isProd = process.env.NODE_ENV === 'production';
    res.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });
    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }
}
