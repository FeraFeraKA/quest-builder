-- DropForeignKey
ALTER TABLE "Quest" DROP CONSTRAINT "Quest_startNodeId_fkey";

-- AlterTable
ALTER TABLE "Quest" ALTER COLUMN "startNodeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_startNodeId_fkey" FOREIGN KEY ("startNodeId") REFERENCES "Node"("id") ON DELETE SET NULL ON UPDATE CASCADE;
