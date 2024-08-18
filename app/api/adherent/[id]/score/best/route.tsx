import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const bestScore = await prisma.score.findFirst({
      where: { id_licence: id },
      orderBy: { total_score: "desc" },
      select: {
        id_score: true,
        total_score: true,
      },
    });
    if (!bestScore) {
      console.log(`Aucun score trouvé pour l'adhérent avec l'ID: ${id}`);
      return NextResponse.json(
        { message: "Aucun score trouvé" },
        { status: 404 }
      );
    }

    console.log(`Meilleur score trouvé:`, bestScore);
    return NextResponse.json(bestScore);
  } catch (error) {
    console.error("Erreur lors de la récupération des scores :", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
