/*
  Warnings:

  - You are about to drop the column `photo` on the `Adherent` table. All the data in the column will be lost.
  - Made the column `num_tel` on table `Adherent` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ville` on table `Adherent` required. This step will fail if there are existing NULL values in that column.
  - Made the column `main_dominante` on table `Adherent` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "email_pseudo_unique";

-- AlterTable
ALTER TABLE "Adherent" DROP COLUMN "photo",
ALTER COLUMN "date_naissance" DROP NOT NULL,
ALTER COLUMN "num_tel" SET NOT NULL,
ALTER COLUMN "ville" SET NOT NULL,
ALTER COLUMN "main_dominante" SET NOT NULL;
