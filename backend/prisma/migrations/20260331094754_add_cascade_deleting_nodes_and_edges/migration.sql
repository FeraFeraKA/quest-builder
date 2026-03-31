-- DropForeignKey
ALTER TABLE "Edge" DROP CONSTRAINT "Edge_nodeFromId_fkey";

-- DropForeignKey
ALTER TABLE "Edge" DROP CONSTRAINT "Edge_nodeToId_fkey";

-- DropForeignKey
ALTER TABLE "Node" DROP CONSTRAINT "Node_questId_fkey";

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_nodeFromId_fkey" FOREIGN KEY ("nodeFromId") REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_nodeToId_fkey" FOREIGN KEY ("nodeToId") REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;
