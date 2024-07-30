// app/api/auth/route.tsx
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pseudo, mdp } = body;

    console.log("Received request:", body);

    if (!pseudo || !mdp) {
      return NextResponse.json(
        { error: "Pseudo et mot de passe requis" },
        { status: 400 }
      );
    }

    const verif = await prisma.adherent.findUnique({
      where: { pseudo },
    });

    if (!verif) {
      return NextResponse.json(
        { error: "Identifiants invalides" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(mdp, verif.mdp);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Identifiants invalides" },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, message: "Connexion réussie" });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
