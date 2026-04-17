-- DropForeignKey
ALTER TABLE "Edge" DROP CONSTRAINT "Edge_questId_fkey";

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
