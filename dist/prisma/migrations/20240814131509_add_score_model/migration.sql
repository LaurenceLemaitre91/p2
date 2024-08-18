-- CreateTable
CREATE TABLE "Score" (
    "id_score" SERIAL NOT NULL,
    "date_tournoi" DATE NOT NULL,
    "categorie" VARCHAR(250) NOT NULL,
    "lieu" VARCHAR(250) NOT NULL,
    "distance" INTEGER NOT NULL,
    "taille_cible" INTEGER NOT NULL,
    "serie" INTEGER NOT NULL,
    "volee" INTEGER NOT NULL,
    "fleche1" INTEGER NOT NULL,
    "fleche2" INTEGER NOT NULL,
    "fleche3" INTEGER NOT NULL,
    "total_volee" INTEGER NOT NULL,
    "total_cumule" INTEGER NOT NULL,
    "total_score" INTEGER NOT NULL,
    "id_licence" TEXT NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id_score")
);

-- CreateIndex
CREATE INDEX "Score_id_licence_idx" ON "Score"("id_licence");

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_id_licence_fkey" FOREIGN KEY ("id_licence") REFERENCES "Adherent"("id_licence") ON DELETE RESTRICT ON UPDATE CASCADE;
