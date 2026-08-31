import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import type { JwtUser } from '../auth/auth.types';
import { parseLocale } from '../common/i18n';
import { PlacesService } from './places.service';
import { FindPlacesQueryDto } from './dto/find-places-query.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { JwtOptionalGuard } from '../auth/guards/jwt-optional.guard';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @UseGuards(JwtOptionalGuard)
  @Get()
  findAll(@Query() query: FindPlacesQueryDto, @Req() req: Request) {
    const userId = (req.user as JwtUser | undefined)?.id;
    return this.placesService.findAll(query, userId, parseLocale(query.lang));
  }

  @Get('categories')
  getCategories() {
    return this.placesService.getCategories();
  }

  @UseGuards(JwtOptionalGuard)
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('lang') lang: string | undefined,
    @Req() req: Request,
  ) {
    const userId = (req.user as JwtUser | undefined)?.id;
    return this.placesService.findOne(id, userId, parseLocale(lang));
  }

  @UseGuards(JwtGuard)
  @Patch(':id/save')
  toggleSave(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const { id: userId } = req.user as JwtUser;
    return this.placesService.toggleSave(id, userId);
  }

  @UseGuards(JwtGuard)
  @Patch(':id/visit')
  toggleVisit(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const { id: userId } = req.user as JwtUser;
    return this.placesService.toggleVisit(id, userId);
  }
}
