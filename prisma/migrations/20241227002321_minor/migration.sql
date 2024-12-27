/*
  Warnings:

  - Made the column `parentID` on table `contents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contentsID` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "contents" DROP CONSTRAINT "contents_parentID_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_contentsID_fkey";

-- AlterTable
ALTER TABLE "contents" ALTER COLUMN "parentID" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "contentsID" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_contentsID_fkey" FOREIGN KEY ("contentsID") REFERENCES "contents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_parentID_fkey" FOREIGN KEY ("parentID") REFERENCES "contents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
