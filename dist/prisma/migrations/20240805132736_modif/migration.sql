/*
  Warnings:

  - You are about to drop the column `id_licence` on the `TypeArc` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[adherentId]` on the table `TypeArc` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adherentId` to the `TypeArc` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Adherent" DROP CONSTRAINT "Adherent_id_licence_fkey";

-- DropIndex
DROP INDEX "TypeArc_id_licence_key";

-- AlterTable
ALTER TABLE "TypeArc" DROP COLUMN "id_licence",
ADD COLUMN     "adherentId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TypeArc_adherentId_key" ON "TypeArc"("adherentId");

-- AddForeignKey
ALTER TABLE "TypeArc" ADD CONSTRAINT "TypeArc_adherentId_fkey" FOREIGN KEY ("adherentId") REFERENCES "Adherent"("id_licence") ON DELETE RESTRICT ON UPDATE CASCADE;
