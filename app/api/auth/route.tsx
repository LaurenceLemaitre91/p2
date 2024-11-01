import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // Récupération de Données d'entrée
    const body = await request.json();
    const { pseudo, mdp } = body;

    if (!pseudo || !mdp) {
      return NextResponse.json(
        { error: "Pseudo et mot de passe requis" },
        { status: 400 }
      );
    }

    const verif = await prisma.adherent.findUnique({
      where: { pseudo },
    });

    if (!verif) {
      return NextResponse.json(
        { error: "Identifiants invalides" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(mdp, verif.mdp);

    if (isPasswordValid) {
      const { id_licence, nom, prenom, main_dominante, type_arc, id_role } =
        verif;
      return NextResponse.json({
        success: true,
        message: "Connexion réussie",
        adherent: {
          id_licence,
          nom,
          prenom,
          main_dominante,
          type_arc,
          id_role,
        },
      });
    } else {
      return NextResponse.json(
        { error: "Identifiants invalides" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Erreur détaillée:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
