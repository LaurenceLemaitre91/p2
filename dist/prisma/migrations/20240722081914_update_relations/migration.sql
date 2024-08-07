-- CreateTable
CREATE TABLE "Role" (
    "id_role" SERIAL NOT NULL,
    "nom_role" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id_role")
);

-- CreateTable
CREATE TABLE "Adherent" (
    "id_licence" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "photo" TEXT,
    "genre" TEXT,
    "date_naissance" TIMESTAMP(3) NOT NULL,
    "num_tel" TEXT,
    "email" TEXT NOT NULL,
    "pseudo" TEXT NOT NULL,
    "mdp" TEXT NOT NULL,
    "ville" TEXT,
    "main_dominante" TEXT,
    "id_role" INTEGER NOT NULL,

    CONSTRAINT "Adherent_pkey" PRIMARY KEY ("id_licence")
);

-- CreateTable
CREATE TABLE "Adhesion" (
    "id_adhesion" SERIAL NOT NULL,
    "tarif" INTEGER NOT NULL,
    "date_adhesion" TIMESTAMP(3),
    "id_licence" TEXT NOT NULL,

    CONSTRAINT "Adhesion_pkey" PRIMARY KEY ("id_adhesion")
);

-- CreateTable
CREATE TABLE "TypeArc" (
    "id_arc" SERIAL NOT NULL,
    "nom_arc" TEXT NOT NULL,
    "id_licence" TEXT NOT NULL,

    CONSTRAINT "TypeArc_pkey" PRIMARY KEY ("id_arc")
);

-- CreateTable
CREATE TABLE "EvenementHasAdherent" (
    "id_evt" SERIAL NOT NULL,
    "id_licence" TEXT NOT NULL,

    CONSTRAINT "EvenementHasAdherent_pkey" PRIMARY KEY ("id_evt")
);

-- CreateTable
CREATE TABLE "Evenement" (
    "id_evt" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "date_evt" TIMESTAMP(3) NOT NULL,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,

    CONSTRAINT "Evenement_pkey" PRIMARY KEY ("id_evt")
);

-- CreateIndex
CREATE UNIQUE INDEX "Adherent_email_key" ON "Adherent"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Adherent_pseudo_key" ON "Adherent"("pseudo");

-- CreateIndex
CREATE INDEX "email_pseudo_unique" ON "Adherent"("email", "pseudo");

-- CreateIndex
CREATE UNIQUE INDEX "Adhesion_id_licence_key" ON "Adhesion"("id_licence");

-- CreateIndex
CREATE UNIQUE INDEX "TypeArc_id_licence_key" ON "TypeArc"("id_licence");

-- AddForeignKey
ALTER TABLE "Adherent" ADD CONSTRAINT "Adherent_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "Role"("id_role") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adhesion" ADD CONSTRAINT "Adhesion_id_licence_fkey" FOREIGN KEY ("id_licence") REFERENCES "Adherent"("id_licence") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeArc" ADD CONSTRAINT "TypeArc_id_licence_fkey" FOREIGN KEY ("id_licence") REFERENCES "Adherent"("id_licence") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvenementHasAdherent" ADD CONSTRAINT "EvenementHasAdherent_id_licence_fkey" FOREIGN KEY ("id_licence") REFERENCES "Adherent"("id_licence") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvenementHasAdherent" ADD CONSTRAINT "EvenementHasAdherent_id_evt_fkey" FOREIGN KEY ("id_evt") REFERENCES "Evenement"("id_evt") ON DELETE RESTRICT ON UPDATE CASCADE;
