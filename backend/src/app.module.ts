import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PlacesModule } from './places/places.module';
import { CitiesModule } from './cities/cities.module';

@Module({
  imports: [PrismaModule, PlacesModule, CitiesModule],
})
export class AppModule {}
