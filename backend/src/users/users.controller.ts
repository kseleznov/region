import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('me/progress')
  getProgress(@Req() req: any) {
    const user = req.user as { id: number };
    return this.usersService.getProgress(user.id);
  }
}
