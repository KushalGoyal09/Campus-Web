/*
  Warnings:

  - You are about to drop the column `postId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `anonymous` on the `Poll` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Poll` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Poll` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Poll` table. All the data in the column will be lost.
  - You are about to drop the column `anonymous` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,tweetId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tweetId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tweetId` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tweetId` to the `Poll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tweetId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_postId_fkey";

-- DropForeignKey
ALTER TABLE "Poll" DROP CONSTRAINT "Poll_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropIndex
DROP INDEX "Like_userId_postId_key";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "postId",
ADD COLUMN     "tweetId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "postId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tweetId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Poll" DROP COLUMN "anonymous",
DROP COLUMN "authorId",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "tweetId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "anonymous",
DROP COLUMN "authorId",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "tweetId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Tweet" (
    "id" TEXT NOT NULL,
    "postId" TEXT,
    "pollId" TEXT,
    "authorId" TEXT NOT NULL,
    "anonymous" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tweet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tweet_postId_key" ON "Tweet"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Tweet_pollId_key" ON "Tweet"("pollId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_tweetId_key" ON "Like"("userId", "tweetId");

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
