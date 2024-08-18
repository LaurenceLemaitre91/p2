// api/adherent/[id]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ---------- RÉCUPÉRER UN ADHÉRENT PAR SON ID -----------------
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
// ---------- METTRE À JOUR UN ADHÉRENT  PAR SON ID -----------------
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
    type_arc,
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
    type_arc,
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
        type_arc,
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
// ---------- SUPPRIMER UN ADHÉRENT PAR SON ID -----------------

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // Extract the ID from the URL

  if (!id) {
    console.error("ID requis non fourni");
    return NextResponse.json({ error: "ID requis" }, { status: 400 });
  }

  try {
    console.log(`Tentative de suppression de l'adhérent avec l'ID: ${id}`);
    const deletedAdherent = await prisma.adherent.delete({
      where: { id_licence: id },
    });

    console.log("Adhérent supprimé:", deletedAdherent);
    return NextResponse.json({ message: "Adhérent supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'adhérent :", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
