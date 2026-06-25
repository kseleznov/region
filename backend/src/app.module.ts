import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PlacesModule } from './places/places.module';
import { CitiesModule } from './cities/cities.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, PlacesModule, CitiesModule, AuthModule, UsersModule],
})
export class AppModule {}
