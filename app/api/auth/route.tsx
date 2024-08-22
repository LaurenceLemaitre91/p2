import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pseudo, mdp } = body;
    console.log("Tentative de connexion pour le pseudo:", pseudo);

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
      console.log("Aucun utilisateur trouvé pour le pseudo:", pseudo);
      return NextResponse.json(
        { error: "Identifiants invalides" },
        { status: 401 }
      );
    }

    console.log("Utilisateur trouvé, vérification du mot de passe...");
    console.log("Mot de passe fourni:", mdp);
    console.log("Hash stocké dans la base de données:", verif.mdp);
    const isPasswordValid = await bcrypt.compare(mdp, verif.mdp);
    console.log("Résultat de la comparaison du mot de passe:", isPasswordValid);

    if (isPasswordValid) {
      console.log("Authentification réussie pour le pseudo:", pseudo);
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
