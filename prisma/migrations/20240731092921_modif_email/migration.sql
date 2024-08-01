/*
  Warnings:

  - A unique constraint covering the columns `[mdp]` on the table `Adherent` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Adherent_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "Adherent_mdp_key" ON "Adherent"("mdp");
