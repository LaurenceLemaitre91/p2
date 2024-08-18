import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function hashExistingPasswords() {
  const adherents = await prisma.adherent.findMany();

  for (const adherent of adherents) {
    const hashedPassword = await bcrypt.hash(adherent.mdp, 10);
    await prisma.adherent.update({
      where: { id_licence: adherent.id_licence },
      data: { mdp: hashedPassword },
    });
  }

  console.log("Tous les mots de passe ont été hachés.");
}

hashExistingPasswords()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
