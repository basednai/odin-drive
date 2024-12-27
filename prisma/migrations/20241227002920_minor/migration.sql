-- DropForeignKey
ALTER TABLE "contents" DROP CONSTRAINT "contents_parentID_fkey";

-- AlterTable
ALTER TABLE "contents" ALTER COLUMN "parentID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_parentID_fkey" FOREIGN KEY ("parentID") REFERENCES "contents"("id") ON DELETE SET NULL ON UPDATE CASCADE;
