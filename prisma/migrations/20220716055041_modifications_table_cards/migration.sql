/*
  Warnings:

  - The values [creditAndDebit] on the enum `CardType` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[userId,title]` on the table `cards` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CardType_new" AS ENUM ('credit', 'debit', 'ambos');
ALTER TABLE "cards" ALTER COLUMN "cardType" TYPE "CardType_new" USING ("cardType"::text::"CardType_new");
ALTER TYPE "CardType" RENAME TO "CardType_old";
ALTER TYPE "CardType_new" RENAME TO "CardType";
DROP TYPE "CardType_old";
COMMIT;

-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cards_userId_title_key" ON "cards"("userId", "title");
