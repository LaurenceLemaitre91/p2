// api/adherent/[id]/score/progression/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const progression = await prisma.score.aggregate({
      where: { id_licence: id },
      _sum: {
        total_score: true,
      },
    });

    // Calculer le pourcentage de progression
    const totalScore = progression._sum.total_score || 0;
    const maxScore = 60; // Supposons que le score maximum est 60
    const progressionPercentage = (totalScore / maxScore) * 100;

    return NextResponse.json({ progression: progressionPercentage });
  } catch (error) {
    // Gestion des erreurs
  }
}
