// Importation de NextResponse pour formater les réponses HTTP
import { NextResponse } from "next/server";
// Importation de PrismaClient pour interagir avec la base de données via Prisma
import { PrismaClient } from "@prisma/client";
// Importation de bcrypt pour le hachage et la comparaison de mots de passe
import bcrypt from "bcrypt";

// Création d'une instance de PrismaClient pour interagir avec la base de données
const prisma = new PrismaClient();

// Fonction pour gérer la requête HTTP POST
export async function POST(request: Request) {
  try {
    // Récupération du corps de la requête au format JSON
    const body = await request.json();
    // Déstructuration des variables pseudo et mdp à partir du corps de la requête
    const { pseudo, mdp } = body;

    // Vérification que les champs pseudo et mdp ne sont pas vides
    if (!pseudo || !mdp) {
      // Si l'un des champs est vide, retour d'une réponse avec un message d'erreur et le statut 400 (Bad Request)
      return NextResponse.json(
        { error: "Pseudo et mot de passe requis" },
        { status: 400 }
      );
    }

    // Recherche dans la base de données d'un utilisateur avec le pseudo donné
    const verif = await prisma.adherent.findUnique({
      where: { pseudo },
    });

    // Si aucun utilisateur n'est trouvé, retour d'une réponse avec un message d'erreur et le statut 401 (Unauthorized)
    if (!verif) {
      return NextResponse.json(
        { error: "Identifiants invalides" },
        { status: 401 }
      );
    }

    // Comparaison du mot de passe fourni avec le mot de passe haché stocké dans la base de données
    const isPasswordValid = await bcrypt.compare(mdp, verif.mdp);

    // Si les mots de passe ne correspondent pas, retour d'une réponse avec un message d'erreur et le statut 401 (Unauthorized)
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Identifiants invalides" },
        { status: 401 }
      );
    }
    // Inclure les informations supplémentaires dans la réponse
    const { nom, prenom, main_dominante } = verif;

    // Si les identifiants sont corrects, retour d'une réponse avec un message de succès

    // Inclure id_role dans la réponse JSON
    return NextResponse.json({
      success: true,
      message: "Connexion réussie",
      user: { nom, prenom, main_dominante },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
