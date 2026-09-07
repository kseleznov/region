import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import type { JwtUser } from '../auth/auth.types';
import { parseLocale } from '../common/i18n';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ReviewsService } from './reviews.service';
import { UpsertReviewDto } from './dto/upsert-review.dto';

@UseGuards(JwtGuard)
@Controller('places/:placeId/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  upsert(
    @Param('placeId', ParseIntPipe) placeId: number,
    @Body() dto: UpsertReviewDto,
    @Query('lang') lang: string | undefined,
    @Req() req: Request,
  ) {
    const { id: userId } = req.user as JwtUser;
    return this.reviewsService.upsert(userId, placeId, dto, parseLocale(lang));
  }

  @Delete('mine')
  removeMine(
    @Param('placeId', ParseIntPipe) placeId: number,
    @Req() req: Request,
  ) {
    const { id: userId } = req.user as JwtUser;
    return this.reviewsService.removeMine(userId, placeId);
  }
}
