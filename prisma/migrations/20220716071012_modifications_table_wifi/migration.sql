/*
  Warnings:

  - You are about to drop the column `local` on the `wifiPasswords` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,title]` on the table `wifiPasswords` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `wifiPasswords` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wifiPasswords" DROP COLUMN "local",
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "wifiPasswords_userId_title_key" ON "wifiPasswords"("userId", "title");
