/*
  Warnings:

  - The `positionX` column on the `Node` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `positionY` column on the `Node` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Node" DROP COLUMN "positionX",
ADD COLUMN     "positionX" DOUBLE PRECISION NOT NULL DEFAULT 0,
DROP COLUMN "positionY",
ADD COLUMN     "positionY" DOUBLE PRECISION NOT NULL DEFAULT 0;
