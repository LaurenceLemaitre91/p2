import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const AdherentSchema = z.object({
  id_licence: z.string(),
  nom: z.string(),
  prenom: z.string(),
  genre: z.string(),
  date_naissance: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Format de date invalide",
  }), // S'assurer que c'est une chaîne de date valide
  num_tel: z.string().optional(),
  email: z.string().email(),
  pseudo: z.string(),
  mdp: z.string(),
  ville: z.string().optional(),
  main_dominante: z.string().optional(),
  id_role: z.number().default(1), // Valeur par défaut à 1
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data: any = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Journaliser les données reçues pour déboguer
    console.log('Données reçues :', data);
    
    // Valider les données avec Zod
    const validatedData = AdherentSchema.parse(data);

    // Convertir date_naissance au format ISO-8601
    validatedData.date_naissance = new Date(validatedData.date_naissance).toISOString();

    console.log('Données validées :', validatedData);

    const adCreate = await prisma.adherent.create({
      data: validatedData,
    });

    return NextResponse.json(adCreate, { status: 201 });
  } catch (error: unknown) {
    console.error('Erreur lors de la création :', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
