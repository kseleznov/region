import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PlacesModule } from './places/places.module';
import { CitiesModule } from './cities/cities.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TipsModule } from './tips/tips.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    PrismaModule,
    PlacesModule,
    CitiesModule,
    AuthModule,
    UsersModule,
    TipsModule,
    ReviewsModule,
  ],
})
export class AppModule {}
