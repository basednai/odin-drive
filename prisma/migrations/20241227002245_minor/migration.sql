/*
  Warnings:

  - You are about to drop the column `userId` on the `contents` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contentsID]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "contents" DROP CONSTRAINT "contents_userId_fkey";

-- AlterTable
ALTER TABLE "contents" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "contentsID" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "users_contentsID_key" ON "users"("contentsID");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_contentsID_fkey" FOREIGN KEY ("contentsID") REFERENCES "contents"("id") ON DELETE SET NULL ON UPDATE CASCADE;
