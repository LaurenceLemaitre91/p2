// app/api/auth/route.tsx
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Exemple fictif de fonction d'authentification
async function authenticateAdh(pseudo: string, mdp: string) {
  // Remplacez ceci par votre logique d'authentification réelle

  // Rechercher l'utilisateur dans la base de données
  const verifpseudo = await prisma.adherent.findUnique({
    where: { pseudo },
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { pseudo, mdp } = req.body;

    try {
      const isAuthenticated = await authenticateAdh(pseudo, mdp);
      if (isAuthenticated) {
      }
      res.status(200).json({ success: true });

      res.status(401).json({ error: "Invalid credentials." });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
