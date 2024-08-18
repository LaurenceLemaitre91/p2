// api/adherent/[id]/score/recent/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
    });
    return NextResponse.json(recentScores);
  } catch (error) {
    // Gestion des erreurs
    console.error("Erreur lors de la récupération des scores :", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
