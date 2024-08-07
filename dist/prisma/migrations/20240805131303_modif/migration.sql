-- DropForeignKey
ALTER TABLE "TypeArc" DROP CONSTRAINT "TypeArc_id_licence_fkey";

-- AddForeignKey
ALTER TABLE "Adherent" ADD CONSTRAINT "Adherent_id_licence_fkey" FOREIGN KEY ("id_licence") REFERENCES "TypeArc"("id_licence") ON DELETE RESTRICT ON UPDATE CASCADE;
