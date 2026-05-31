-- CreateTable
CREATE TABLE "Place" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "photos" JSONB NOT NULL DEFAULT '[]',
    "stars" DOUBLE PRECISION NOT NULL,
    "price" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "isOpen" BOOLEAN NOT NULL,
    "isSaved" BOOLEAN NOT NULL,
    "workingHours" JSONB NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);
