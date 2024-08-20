// api/adherent/[id]/score/progression/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log("ID reçu:", id);
  try {
    // Récupérer le dernier tournoi de l'adhérent
    const lastTournament = await prisma.score.findFirst({
      where: { id_licence: id },
      orderBy: { date_tournoi: "desc" },
      select: { date_tournoi: true },
    });
    console.log("Dernier tournoi:", lastTournament);

    if (!lastTournament) {
      return NextResponse.json(
        { error: "Aucun tournoi trouvé" },
        { status: 404 }
      );
    }

    // Récupérer tous les scores du dernier tournoi
    const scores = await prisma.score.findMany({
      where: {
        id_licence: id,
        date_tournoi: lastTournament.date_tournoi,
      },
      select: {
        fleche1: true,
        fleche2: true,
        fleche3: true,
      },
    });

    let count9 = 0;
    let count10 = 0;

    scores.forEach((score) => {
      [score.fleche1, score.fleche2, score.fleche3].forEach((fleche) => {
        if (fleche === 9) count9++;
        if (fleche === 10) count10++;
      });
    });

    console.log("Nombre de 9:", count9, "Nombre de 10:", count10);

    return NextResponse.json({
      count9,
      count10,
      dateTournoi: lastTournament.date_tournoi,
    });
  } catch (error) {
    console.error("Erreur lors du calcul de la progression:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
