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

  try {
    // Recherche de l'événement par ID
    const event = await prisma.adherent.findUnique({
      where: { id_licence: String(id) },
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

  const {
    nom,
    prenom,
    genre,
    date_naissance,
    num_tel,
    email,
    pseudo,
    ville,
    main_dominante,
  } = await req.json();

  // Vérifiez les données reçues
  console.log("Données reçues pour la mise à jour :", {
    nom,
    prenom,
    genre,
    date_naissance,
    num_tel,
    email,
    pseudo,
    ville,
    main_dominante,
  });

  try {
    const updatedEvent = await prisma.adherent.update({
      where: { id_licence: String(id) },
      data: {
        nom,
        prenom,
        genre,
        date_naissance: new Date(date_naissance),
        num_tel,
        email,
        pseudo,
        ville,
        main_dominante,
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
