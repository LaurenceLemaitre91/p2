import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: [
      { id_role: 1, nom_role: 'Adhérent' },
      { id_role: 2, nom_role: 'Administrateur' },
    ],
    skipDuplicates: true,
  });

  await prisma.adherent.createMany({
    data: [
      {
        id_licence: '1012969B',
        nom: 'LEMAITRE',
        prenom: 'Laurence',
        photo: 'moi.jpeg',
        genre: 'femme',
        date_naissance: new Date('1981-08-29'),
        num_tel: '0688786545',
        email: 'lilybee91@hotmail.com',
        pseudo: 'lilybee91',
        mdp: 'lolo54',
        ville: 'Nancy',
        main_dominante: 'droite',
        id_role: 1,
      },
      {
        id_licence: '2435699A',
        nom: 'Goodman',
        prenom: 'Cherokee',
        photo: 'profil.jpeg',
        genre: 'homme',
        date_naissance: new Date('1990-04-09'),
        num_tel: '070152008',
        email: 'g.cherokee9587@hotmail.com',
        pseudo: 'cherokee9587',
        mdp: 'BXU55UVS3GS',
        ville: 'Troyes',
        main_dominante: 'gauche',
        id_role: 1,
      },
      {
        id_licence: '3476098B',
        nom: 'Acevedo',
        prenom: 'Elaine',
        photo: 'photo.jpeg',
        genre: 'femme',
        date_naissance: new Date('1986-07-16'),
        num_tel: '0415060909',
        email: 'e_acevedo5064@icloud.org',
        pseudo: 'acevedo5064',
        mdp: 'ULA03LKU4BF',
        ville: 'Rueil-Malmaison',
        main_dominante: 'droite',
        id_role: 1,
      },
      {
        id_licence: '4096898C',
        nom: 'Oliver',
        prenom: 'Zorita',
        photo: 'myphoto.jpeg',
        genre: 'homme',
        date_naissance: new Date('1957-11-27'),
        num_tel: '0581675854',
        email: 'zoritaoliver9124@yahoo.net',
        pseudo: 'oliver9124',
        mdp: 'MWH88NGR7XU',
        ville: 'Saint-Herblain',
        main_dominante: 'gauche',
        id_role: 1,
      },
      {
        id_licence: '4398237Y',
        nom: 'Hensley',
        prenom: 'Cassady',
        photo: 'ski.jpeg',
        genre: 'homme',
        date_naissance: new Date('2012-06-09'),
        num_tel: '0114602701',
        email: 'hensleycassady@icloud.ca',
        pseudo: 'cassady8908',
        mdp: 'FJU53KRR2NP',
        ville: 'Rennes',
        main_dominante: 'droite',
        id_role: 1,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.adhesion.createMany({
    data: [
      {
        tarif: 120,
        date_adhesion: new Date('2023-09-29'),
        id_licence: '1012969B',
      },
      {
        tarif: 100,
        date_adhesion: new Date('2023-10-19'),
        id_licence: '2435699A',
      },
    ],
    skipDuplicates: true,
  });

  await prisma.typeArc.createMany({
    data: [
      { nom_arc: 'Arc simple', id_licence: '1012969B' },
      { nom_arc: 'Arc simple', id_licence: '2435699A' },
      { nom_arc: 'Arc à Poulie', id_licence: '4398237Y' },
    ],
    skipDuplicates: true,
  });

  await prisma.evenement.createMany({
    data: [
      {
        nom: 'Compétition fin d année',
        date_evt: new Date('2024-07-03'),
        description: 'Compétition amical avec pot de l amitié à HEILLECOURT',
      },
      {
        nom: 'Para-tir Championnat de France',
        date_evt: new Date('2024-07-06'),
        description: 'Championnat de France à FONTAINEBLEAU',
      },
      {
        nom: 'Rentrée du club',
        date_evt: new Date('2024-09-03'),
        description: 'Rentrée du club avec Apéro',
      },
      {
        nom: 'Compétition Régionale para-tir',
        date_evt: new Date('2024-11-23'),
        description: 'Compétition Régionale Intérieure para-tir à FLAVIGNY',
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => console.log('Seed data created successfully'))
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
