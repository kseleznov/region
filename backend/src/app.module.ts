import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PlacesModule } from './places/places.module';

@Module({
  imports: [PrismaModule, PlacesModule],
})
export class AppModule {}
