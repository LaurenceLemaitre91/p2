/*
  Warnings:

  - You are about to drop the `TypeArc` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type_arc` to the `Adherent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TypeArc" DROP CONSTRAINT "TypeArc_adherentId_fkey";

-- AlterTable
ALTER TABLE "Adherent" ADD COLUMN     "type_arc" TEXT NOT NULL;

-- DropTable
DROP TABLE "TypeArc";
