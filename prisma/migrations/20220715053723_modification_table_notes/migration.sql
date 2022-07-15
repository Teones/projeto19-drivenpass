/*
  Warnings:

  - A unique constraint covering the columns `[userId,title]` on the table `secureNotes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "secureNotes_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "secureNotes_userId_title_key" ON "secureNotes"("userId", "title");
