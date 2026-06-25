import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import type { JwtUser } from '../auth/auth.types';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('me/progress')
  getProgress(@Req() req: Request) {
    const { id } = req.user as JwtUser;
    return this.usersService.getProgress(id);
  }
}
