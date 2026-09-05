import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import type { JwtUser } from '../auth/auth.types';
import { parseLocale } from '../common/i18n';
import { UsersService } from './users.service';
import { UpdateMeDto } from './dto/update-me.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { JwtOptionalGuard } from '../auth/guards/jwt-optional.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('me/progress')
  getProgress(@Req() req: Request) {
    const { id } = req.user as JwtUser;
    return this.usersService.getProgress(id);
  }

  @UseGuards(JwtGuard)
  @Patch('me')
  updateMe(@Body() dto: UpdateMeDto, @Req() req: Request) {
    const { id } = req.user as JwtUser;
    return this.usersService.updateMe(id, dto);
  }

  @UseGuards(JwtGuard)
  @Get('me/followers')
  getMyFollowers(@Req() req: Request) {
    const { id } = req.user as JwtUser;
    return this.usersService.getFollowers(id);
  }

  @UseGuards(JwtGuard)
  @Get('me/following')
  getMyFollowing(@Req() req: Request) {
    const { id } = req.user as JwtUser;
    return this.usersService.getFollowing(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':username/follow')
  toggleFollow(@Param('username') username: string, @Req() req: Request) {
    const { id } = req.user as JwtUser;
    return this.usersService.toggleFollow(id, username);
  }

  @UseGuards(JwtOptionalGuard)
  @Get(':username')
  getPublicProfile(
    @Param('username') username: string,
    @Query('lang') lang: string | undefined,
    @Req() req: Request,
  ) {
    const userId = (req.user as JwtUser | undefined)?.id;
    return this.usersService.getPublicProfile(
      username,
      userId,
      parseLocale(lang),
    );
  }
}
