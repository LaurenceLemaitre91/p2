// pages/api/events/all-events.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ---------- LECTURE DE TOUS LES ÉVÈNEMENTS -----------
export async function GET() {
  try {
    const events = await prisma.evenement.findMany({
      orderBy: {
        date_evt: "asc",
      },
    });
    return NextResponse.json(events);
  } catch (error) {
    console.error("Erreur lors de la récupération des événements :", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des événements" },
      { status: 500 }
    );
  }
}
