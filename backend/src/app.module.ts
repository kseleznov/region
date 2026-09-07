import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PlacesModule } from './places/places.module';
import { CitiesModule } from './cities/cities.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TipsModule } from './tips/tips.module';

@Module({
  imports: [
    PrismaModule,
    PlacesModule,
    CitiesModule,
    AuthModule,
    UsersModule,
    TipsModule,
  ],
})
export class AppModule {}
