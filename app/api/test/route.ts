// app/api/test/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pseudo, mdp } = body;

    // Logique de test simple pour retourner les données reçues
    return NextResponse.json({ pseudo, mdp });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
