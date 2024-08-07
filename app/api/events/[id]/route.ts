// api/events/[id]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ---------- RÉCUPÉRER UN ÉVÈNEMENT PAR SON ID -----------------
export async function GET(req: Request) {
  // Création d'un objet URL à partir de l'URL de la requête
  const url = new URL(req.url);

  // Extraction de l'ID de l'URL
  const id = url.pathname.split("/").pop(); // On suppose que l'ID est le dernier élément du chemin

  console.log("ID récupéré depuis l'URL :", id); // Debug

  // Validation de l'ID
  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "ID requis et valide" }, { status: 400 });
  }

  try {
    // Recherche de l'événement par ID
    const event = await prisma.evenement.findUnique({
      where: { id_evt: Number(id) },
    });

    console.log("Événement récupéré :", event); // Debug

    // Vérification si l'événement a été trouvé
    if (!event) {
      return NextResponse.json(
        { error: "Événement non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'événement :", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// ---------- METTRE À JOUR UN ÉVÈNEMENT PAR SON ID -----------------
export async function PUT(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // Récupérer l'ID depuis l'URL

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "ID requis et valide" }, { status: 400 });
  }

  const { nom, date_evt, description } = await req.json();

  // Vérifiez les données reçues
  console.log("Données reçues pour la mise à jour :", {
    nom,
    date_evt,
    description,
  });

  try {
    const updatedEvent = await prisma.evenement.update({
      where: { id_evt: Number(id) },
      data: {
        nom,
        date_evt: new Date(date_evt), // Assurez-vous que date_evt est une chaîne ISO valide
        description,
      },
    });
    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'événement :", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
// ---------- SUPPRIMER UN ÉVÈNEMENT PAR SON ID -----------------
export async function DELETE(req: Request) {
  const { pathname } = new URL(req.url);
  const id = pathname.split("/").pop(); // Récupérer l'ID à partir de l'URL

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "ID requis et valide" }, { status: 400 });
  }

  try {
    const event = await prisma.evenement.delete({
      where: { id_evt: Number(id) },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Adhérent non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Adhérent supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'adhérent :", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
