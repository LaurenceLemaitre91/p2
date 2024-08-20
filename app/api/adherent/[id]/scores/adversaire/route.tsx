// api/adherent/[id]/adversaire/route.tsx
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  console.log("API adversaire appelée avec l'ID:", params.id);
  const { id } = params;

  try {
    const adversaires = await prisma.score.findMany({
      where: {
        NOT: { id_licence: id },
        // Assurez-vous que le score est du même type de compétition que l'adhérent
        // Vous pouvez ajouter d'autres conditions ici si nécessaire
      },
      orderBy: { total_score: "desc" },
      take: 3,
      distinct: ["id_licence"],
      select: {
        adherent: {
          select: {
            nom: true,
            prenom: true,
            id_licence: true,
          },
        },
        total_score: true,
        categorie: true,
        date_tournoi: true,
      },
    });

    console.log("Adversaires trouvés:", adversaires);

    const formattedAdversaires = adversaires.map((adv) => ({
      nom: adv.adherent.nom,
      prenom: adv.adherent.prenom,
      id_licence: adv.adherent.id_licence,
      total_score: adv.total_score,
      categorie: adv.categorie,
      date_tournoi: adv.date_tournoi.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }));

    console.log("Adversaires formatés:", formattedAdversaires);

    return NextResponse.json(formattedAdversaires);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des scores des adversaires :",
      error
    );
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
