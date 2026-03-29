/*
  Warnings:

  - Added the required column `questId` to the `Edge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Edge" ADD COLUMN     "questId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
