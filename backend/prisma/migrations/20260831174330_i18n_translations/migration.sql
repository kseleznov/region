-- AlterTable
ALTER TABLE "City" DROP COLUMN "description",
DROP COLUMN "name",
DROP COLUMN "weather";

-- AlterTable
ALTER TABLE "Place" DROP COLUMN "address",
DROP COLUMN "description",
DROP COLUMN "expectations",
DROP COLUMN "name",
DROP COLUMN "workingHours";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "text";

-- CreateTable
CREATE TABLE "PlaceTranslation" (
    "placeId" INTEGER NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "workingHours" JSONB NOT NULL,
    "expectations" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "PlaceTranslation_pkey" PRIMARY KEY ("placeId","locale")
);

-- CreateTable
CREATE TABLE "ReviewTranslation" (
    "reviewId" INTEGER NOT NULL,
    "locale" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "ReviewTranslation_pkey" PRIMARY KEY ("reviewId","locale")
);

-- CreateTable
CREATE TABLE "CityTranslation" (
    "cityId" INTEGER NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "weather" JSONB NOT NULL,

    CONSTRAINT "CityTranslation_pkey" PRIMARY KEY ("cityId","locale")
);

-- AddForeignKey
ALTER TABLE "PlaceTranslation" ADD CONSTRAINT "PlaceTranslation_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewTranslation" ADD CONSTRAINT "ReviewTranslation_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CityTranslation" ADD CONSTRAINT "CityTranslation_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

