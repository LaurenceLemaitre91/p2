import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ---------- RÉCUPÉRER UN ÉVÈNEMENT PAR SON ID -----------------
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID requis" }, { status: 400 });
  }

  try {
    const event = await prisma.evenement.findUnique({
      where: { id_evt: Number(id) },
    });
    return NextResponse.json(event);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'événement :", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// ---------- METTRE A JOUT UN ÉVÈNEMENT PAR SON ID -----------------
export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID requis" }, { status: 400 });
  }

  const { nom, date_evt, description } = await req.json();

  try {
    const updatedEvent = await prisma.evenement.update({
      where: { id_evt: Number(id) },
      data: {
        nom,
        date_evt: new Date(date_evt),
        description,
      },
    });
    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'événement :", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
