import { NextResponse } from 'next/server';
//PrismaClient : Utilisé pour interagir avec la base de données via Prisma.
import { PrismaClient } from '@prisma/client';

// Création d'une instance de PrismaClient pour interagir avec la base de données
const prisma = new PrismaClient();

// Fonction pour gérer la requête HTTP GET
export async function GET() {
  try {
// Récupération des événements avec une limite de 3 résultats, triés par date décroissante
    const events = await prisma.evenement.findMany({
        take: 3, // Limite les résultats à 3
        orderBy: {
            date_evt: 'desc', // Ordre décroissant par date
          },
      });
//NextResponse : Utilisé pour formater les réponses HTTP dans Next.js
// Retourne les événements au format JSON

    return NextResponse.json(events);
  } catch (error) {
// Gestion des erreurs
    return NextResponse.error();
  }
}
