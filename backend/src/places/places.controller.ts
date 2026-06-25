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
import { PlacesService } from './places.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { JwtOptionalGuard } from '../auth/guards/jwt-optional.guard';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @UseGuards(JwtOptionalGuard)
  @Get()
  findAll(@Req() req: Request) {
    const userId = (req.user as JwtUser | undefined)?.id;
    return this.placesService.findAll(userId);
  }

  @Get('categories')
  getCategories() {
    return this.placesService.getCategories();
  }

  @UseGuards(JwtOptionalGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const userId = (req.user as JwtUser | undefined)?.id;
    return this.placesService.findOne(id, userId);
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
