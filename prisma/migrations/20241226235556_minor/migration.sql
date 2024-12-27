/*
  Warnings:

  - Made the column `userId` on table `contents` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "contents" DROP CONSTRAINT "contents_userId_fkey";

-- AlterTable
ALTER TABLE "contents" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
