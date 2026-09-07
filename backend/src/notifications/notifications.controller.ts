import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import type { JwtUser } from '../auth/auth.types';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { NotificationsService } from './notifications.service';

@UseGuards(JwtGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  list(@Req() req: Request) {
    const { id } = req.user as JwtUser;
    return this.notificationsService.list(id);
  }

  @Get('unread-count')
  unreadCount(@Req() req: Request) {
    const { id } = req.user as JwtUser;
    return this.notificationsService.unreadCount(id);
  }

  @Patch('read')
  markAllRead(@Req() req: Request) {
    const { id } = req.user as JwtUser;
    return this.notificationsService.markAllRead(id);
  }

  @Patch(':id/read')
  markRead(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const { id: userId } = req.user as JwtUser;
    return this.notificationsService.markRead(userId, id);
  }
}
