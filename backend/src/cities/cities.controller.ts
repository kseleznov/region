import { Controller, Get, Param, Query } from '@nestjs/common';
import { parseLocale } from '../common/i18n';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get(':slug')
  findOne(
    @Param('slug') slug: string,
    @Query('lang') lang: string | undefined,
  ) {
    return this.citiesService.findBySlug(slug, parseLocale(lang));
  }
}
