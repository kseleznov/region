import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import type { JwtUser } from '../auth/auth.types';
import { parseLocale } from '../common/i18n';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { TipsService } from './tips.service';
import { CreateTipDto } from './dto/create-tip.dto';
import { UpdateTipDto } from './dto/update-tip.dto';

@UseGuards(JwtGuard)
@Controller('tips')
export class TipsController {
  constructor(private readonly tipsService: TipsService) {}

  @Get('me')
  findMine(@Query('lang') lang: string | undefined, @Req() req: Request) {
    const { id } = req.user as JwtUser;
    return this.tipsService.findMine(id, parseLocale(lang));
  }

  @Post()
  create(
    @Body() dto: CreateTipDto,
    @Query('lang') lang: string | undefined,
    @Req() req: Request,
  ) {
    const { id } = req.user as JwtUser;
    return this.tipsService.create(id, dto, parseLocale(lang));
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTipDto,
    @Query('lang') lang: string | undefined,
    @Req() req: Request,
  ) {
    const { id: userId } = req.user as JwtUser;
    return this.tipsService.update(userId, id, dto.note, parseLocale(lang));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const { id: userId } = req.user as JwtUser;
    return this.tipsService.remove(userId, id);
  }
}
