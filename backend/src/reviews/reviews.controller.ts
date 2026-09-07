import {
  Body,
  Controller,
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
import { CreateReviewDto } from './dto/create-review.dto';

@UseGuards(JwtGuard)
@Controller('places/:placeId/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(
    @Param('placeId', ParseIntPipe) placeId: number,
    @Body() dto: CreateReviewDto,
    @Query('lang') lang: string | undefined,
    @Req() req: Request,
  ) {
    const { id: userId } = req.user as JwtUser;
    return this.reviewsService.create(userId, placeId, dto, parseLocale(lang));
  }
}
