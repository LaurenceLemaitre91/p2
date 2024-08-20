// api/adherent/[id]/score/recent/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fonction pour formater les dates en Français
function formatDateToFrench(date: Date): string {
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const recentScores = await prisma.score.findMany({
      where: { id_licence: id },
      orderBy: { date_tournoi: "desc" },
      take: 3,
      distinct: ["date_tournoi"],
      select: {
        id_score: true,
        date_tournoi: true,
        categorie: true,
        total_score: true,
      },
    });
    //Après avoir récupéré les scores, on fait map pour créer un nouveau tableau formattedScores où chaque date_tournoi est formatée en français.
    const formattedScores = recentScores.map((score) => ({
      //...score Récupére toutes les propriétés existantes de l'objet score dans le nouvel objet créer
      ...score,
      date_tournoi: formatDateToFrench(score.date_tournoi),
    }));

    return NextResponse.json(formattedScores);
  } catch (error) {
    console.error("Erreur lors de la récupération des scores :", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
