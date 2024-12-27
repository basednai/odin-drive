-- DropForeignKey
ALTER TABLE "contents" DROP CONSTRAINT "contents_parentID_fkey";

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_parentID_fkey" FOREIGN KEY ("parentID") REFERENCES "contents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
