-- Reviews are now always authored by a registered user (seed no longer creates
-- language-neutral reviews). Drop the denormalised author/avatar columns and
-- require userId; author name and avatar are read live from the User relation.

DELETE FROM "Review" WHERE "userId" IS NULL;

ALTER TABLE "Review" DROP COLUMN "author";
ALTER TABLE "Review" DROP COLUMN "avatar";
ALTER TABLE "Review" ALTER COLUMN "userId" SET NOT NULL;

ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
