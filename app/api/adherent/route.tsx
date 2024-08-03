import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const AdherentSchema = z.object({
  id_licence: z.string(),
  nom: z.string(),
  prenom: z.string(),
  genre: z.string(),
  date_naissance: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Format de date invalide",
  }),
  //pas number car peut contenir des espaces ou des tirets
  num_tel: z.string(),
  email: z.string().email(),
  pseudo: z.string(),
  mdp: z.string(),
  ville: z.string(),
  main_dominante: z.string(),
  id_role: z.number().default(1), // Valeur par défaut à 1
});

// --------------- Inscription des Adhérents ---------------

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data: any = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Journaliser les données reçues pour déboguer
    console.log("Données reçues :", data);

    // Valider les données avec Zod
    const validatedData = AdherentSchema.parse(data);

    // Convertir date_naissance au format JJ/MM/AAAA
    validatedData.date_naissance = new Date(
      validatedData.date_naissance
    ).toISOString();

    console.log("Données validées :", validatedData);

    // Hacher le mot de passe
    const salt = await bcrypt.genSalt(10);
    validatedData.mdp = await bcrypt.hash(validatedData.mdp, salt);

    // --------- Création de l'Adhérent ------------
    const adCreate = await prisma.adherent.create({
      data: validatedData,
    });

    return NextResponse.json(adCreate, { status: 201 });
  } catch (error: unknown) {
    console.error("Erreur lors de la création :", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
// ---------- LECTURE DES ADHÉRENTS   -----------------
export async function GET() {
  try {
    // Récupération des Adhérents
    const adherent = await prisma.adherent.findMany({
      //Adhérents trier par ordre alphabétique
      orderBy: {
        nom: "asc",
      },
    });

    // Retourne les événements au format JSON

    //NextResponse : Utilisé pour formater les réponses HTTP dans Next.js
    return NextResponse.json(adherent);
  } catch (error) {
    console.error("Erreur lors de la récupération des adhérents:", error);
    // Gestion des erreurs
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
// ---------- METTRE A JOUR UN ADHÉRENT -----------------
export async function PUT(request: Request) {
  try {
    // Extraction des données JSON de la requête
    const {
      id_licence,
      nom,
      prenom,
      genre,
      date_naissance,
      num_tel,
      pseudo,
      ville,
      main_dominante,
    } = await request.json();

    // Vérifier si id_evt est bien défini
    if (!id_licence) {
      return NextResponse.json(
        { error: "ID de l'adhérent requis" },
        { status: 400 }
      );
    }

    // Mise à jour de l'Adhérent dans la base de données
    const updatedAdh = await prisma.adherent.update({
      where: { id_licence },
      data: {
        nom,
        prenom,
        genre,
        date_naissance: new Date(date_naissance).toISOString(),
        num_tel,
        pseudo,
        ville,
        main_dominante,
      },
    });

    // Réponse avec l'Adhérent mis à jour
    return NextResponse.json(updatedAdh);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'adhérent :", error);

    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de l'adhérent" },
      { status: 500 }
    );
  }
}

// ---------- SUPPRIMER UN ADHÉRENT -----------------
export async function DELETE(request: Request) {
  try {
    // Extraction des données JSON de la requête
    const { id_licence } = await request.json();

    // Vérifier si id_licence est bien défini
    if (!id_licence) {
      return NextResponse.json(
        { error: "ID de l'adhérent requis" },
        { status: 400 }
      );
    }

    // Suppression de l'adhérent dans la base de données
    await prisma.adherent.delete({
      where: { id_licence },
    });
    // Réponse avec statut 204 indiquant une suppression réussie
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'adhérent :", error);

    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'adhérent" },
      { status: 500 }
    );
  }
}
