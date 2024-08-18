// api/adherent/[id]/adversaires/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  // Cette requête pourrait être plus complexe, nécessitant peut-être des jointures ou des sous-requêtes
  // Voici un exemple simplifié
  try {
    const adversaires = await prisma.score.findMany({
      where: {
        NOT: { id_licence: id },
        // Autres conditions pour trouver les adversaires pertinents
      },
      orderBy: { total_score: "desc" },
      take: 3,
      select: {
        adherent: { select: { nom: true, prenom: true } },
        total_score: true,
      },
    });
    return NextResponse.json(adversaires);
  } catch (error) {
    // Gestion des erreurs
    console.error("Erreur lors de la récupération des scores :", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
