-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('FILE', 'DIRECTORY');

-- CreateTable
CREATE TABLE "contents" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parentID" INTEGER NOT NULL,
    "type" "ContentType" NOT NULL DEFAULT 'FILE',
    "userId" INTEGER,

    CONSTRAINT "contents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contents_parentID_key" ON "contents"("parentID");

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_parentID_fkey" FOREIGN KEY ("parentID") REFERENCES "contents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
