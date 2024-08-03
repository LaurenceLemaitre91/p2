// app/api/events.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const EventSchema = z.object({
  id_evt: z.number().optional(), // Optional si auto-généré
  nom: z.string(),
  date_evt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Format de date invalide",
  }),
  date_creation: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Format de date invalide",
  }),
  description: z.string(),
});
// ---------- LECTURE DES ÉVÈNEMENT AVEC CRITÈRES SÉLECTIVES -----------
export async function GET() {
  try {
    const events = await prisma.evenement.findMany({
      take: 3,
      orderBy: {
        date_evt: "asc",
      },
    });
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.error();
  }
}
// ---------- CRÉATION D'UN ÉVÈNEMENT  -----------------
export async function POST(request: Request) {
  try {
    const data = await request.json();

    console.log("Données reçues :", data);

    // Valider les données avec Zod
    const validatedData = EventSchema.parse(data);

    // Convertir date_evt et date_creation au format ISO avant de les stocker
    validatedData.date_evt = new Date(validatedData.date_evt).toISOString();
    validatedData.date_creation = new Date(
      validatedData.date_creation
    ).toISOString();

    console.log("Données validées :", validatedData);

    const adCreate = await prisma.evenement.create({
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

// ---------- SUPPRIMER UN ÉVÈNEMENT  -----------------
export async function DELETE(request: Request) {
  try {
    // Extraction des données JSON de la requête
    const { id_evt } = await request.json();

    // Vérifier si id_licence est bien défini
    if (!id_evt) {
      return NextResponse.json(
        { error: "ID de l'événement requis" },
        { status: 400 }
      );
    }

    // Suppression de l'adhérent dans la base de données
    await prisma.evenement.delete({
      where: { id_evt },
    });

    // Réponse avec statut 204 indiquant une suppression réussie
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'événement :", error);

    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'événement" },
      { status: 500 }
    );
  }
}
