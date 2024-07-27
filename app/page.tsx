// Importer les modules nécessaires et activer le mode client
"use client";  // <-- Ajoutez cette ligne en haut du fichier pour indiquer que ce composant est un composant client.

import Image from "next/image";  // Importation du composant Image de Next.js pour gérer les images.
import Link from 'next/link';  // Importation du composant Link de Next.js pour la navigation entre les pages.
import { useEffect, useState } from 'react';  // Importation des hooks useEffect et useState de React.

// Définir le type TypeScript pour les événements
type Evenement = {
  id_evt: number;  // Identifiant unique de l'événement.
  nom: string;  // Nom de l'événement.
  date_evt: Date;  // Date de l'événement.
  date_creation: Date;  // Date de création de l'événement.
  description: string;  // Description de l'événement.
};
// Fonction pour formater les dates au format français
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
};
// Composant principal pour la page d'accueil
export default function Home() {
  // Déclaration du state pour stocker les événements récupérés
  const [events, setEvents] = useState<Evenement[]>([]);

  // Effet secondaire pour récupérer les événements depuis l'API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Appel à l'API pour récupérer les événements
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Network response was not ok');  // Gestion des erreurs de réponse réseau
        }
        const eventsData: Evenement[] = await response.json();  // Analyse de la réponse JSON
        setEvents(eventsData);  // Mise à jour du state avec les événements récupérés
      } catch (error) {
        console.error('Failed to fetch events:', error);  // Gestion des erreurs de récupération des événements
      }
    };

    fetchEvents();  // Appeler la fonction fetchEvents lors du montage du composant
  }, []);  // Le tableau vide [] indique que cet effet ne doit s'exécuter qu'une seule fois, lors du montage


  return (
    <>
    <div className="icon">
      
            <div className="icon__div__img">
              <div className="div__bouton">
            <Link className='link__logo' href={'inscription'}>
    <Image
              className='icon__img'
              src="/icon/inscription.png"
              width={80}
              height={80}
              alt="Icone de inscription "
            />
            </Link>
            <p className="icon__p">Inscription</p>
            </div>

             <div className="div__bouton">
            <Link className='link__logo' href={'connexion'}>
    <Image
              className='icon__img'
              src="/icon/login.png"
              width={80}
              height={80}
              alt="Icone de log"
            />
            </Link>
            <p className="icon__p">Connexion</p>
            </div>
            
            
            
          
            </div>
    
    </div>
      <h2>Présentation du club</h2>
      <nav className='navhome'>
        <div className='div__link'>
          <Link className='link__navhome' href={'#histoire'}>
            Notre histoire
          </Link>
          <Link className='link__navhome' href={'#evt'}>
            Nos prochains événements
          </Link>
          <Link className='link__navhome' href={'#obj'}>
            Nos Objectifs
          </Link>
          <Link className='link__navhome' href={'#localisation'}>
            Localisation du club
          </Link>
        </div>
      </nav>
      <section className='histoire' id="histoire">
        <article className='histoire__art'>
          <div className='histoire__art__div'>
            <p className='histoire__art__div__p'>
            Si l’association a été créée en 2015, elle ne commence véritablement à exister que depuis 2016-2017. Elle se composait alors de 5 membres valides et de 5 membres à mobilité réduite. Toutefois, l’absence de moyens financiers et de mise à disposition de locaux d’accueil sur la commune, mais également le manque de disponibilité d’une seule personne pouvant officier comme entraîneur au sein de l’association, n’a pas permis de satisfaire à une demande émanant de nombreux adhérents potentiels.</p>

<br />
<p className='histoire__art__div__p'>
Depuis février 2017, après insistance auprès des élus locaux, l’association a pu obtenir une subvention municipale et deux créneaux d’utilisation de la salle de sport de la commune …… mais restait quand même à résoudre en premier lieu le problème de l’encadrement. Pour permettre d’accroître les créneaux de pratique et de découverte, il a été jugé indispensable au sein de l’association de former un second encadrant bénévole pour accueillir d’autres pratiquants à des moments différents, ce qui a été réalisé en juin 2017 par l’obtention d’un Certificat de Qualification Professionnelle de Tir à l’Arc par l’actuel Trésorier de l’association, Pierre Tankosic. Le coût de la formation s’est élevé à 1220 euros.</p>

<br />
<p className='histoire__art__div__p'>
La saison 2017-2018 marque le véritable démarrage de l’association. Elle comptait cette année là 15 membres dont 6 adultes, 5 jeunes âgés de 8 à 12 ans, 3 personnes en fauteuil et 1 personne présentant une déficience visuelle.</p>
            
          </div>
          <div className='histoire__art__img'>
            
            <Image
              className='img__histoire'
              src="/images/article.webp"
              width={800}
              height={800}
              alt="Article de journal"
            />
          </div>
        </article>
      </section>
      <section className='evt' id="evt">
        <h2 className='evt__title'>Prochains Evénements du club</h2>
        <ul>
           {/* Affichage des événements récupérés */}
          {events.map((event) => (
            <li key={event.id_evt}>
              <h3>{event.nom}</h3>
              <h4>{formatDate(new Date(event.date_evt))}</h4>
              <p className="event__p">{event.description}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="obj ">
        <h2 className="obj_title"id="obj">Nos Objectifs </h2>
        <div className="obj">
        <h3 className="obj__subTitle">Sport pour tous</h3>
        <p className="obj__p">Comme son nom l’indique, l’association des « Archers Sans Limite » se veut accessible à tout type de public, personnes valides ou personnes à mobilité réduite c’est-à-dire en situation de handicap, voire même de grand handicap, jeunes, et moins jeunes, à partir de 8 ans et plus...
Pour les personnes à mobilité réduite, la pratique recherchée est identique aux conditions des archers valides, avec des personnes ayant une incapacité fonctionnelle pouvant aller jusqu’à 100%.</p>
<p className="obj__p">Cette pratique cherche à donner une autonomie totale dans l’activité, une finesse et une complexité d’apprentissage comparable à celles rencontrées chez des archers valides. Cette autonomie est présente dans tous les types de déficiences : motrice, sensorielle, cognitive, psychique et mentale. Un matériel adapté permet d’obtenir rapidement des résultats visibles et durables dans la pratique. Une ½ heure à 1 heure suffit pour être capable de mettre l’arc en tension, orienter globalement la flèche et libérer la corde.</p>
<p className="obj__p">
A travers différentes adaptations (dispositif « arc-cessible » pour les grands handicaps, potence pour les non-voyants ou déficients visuels, apprentissage différencié pour les troubles cognitifs, simplification de l’activité pour les déficiences mentales…), l’association rend effective l’inclusion universelle des personnes en situation de handicap dans le sport valide et supprime donc la situation de handicap dans ce domaine. C’est le concept du « sport partagé ». Le but est donc de leur faire faire « la même chose », mais « autrement ». La base de l’apprentissage restera la même, avec quelques aménagements en fonction du type de handicap..</p>
        </div>
       <div className="obj">
       <h3 className="obj__subTitle">Le para-tir</h3>
       <p className="obj__p">La subvention municipale d’Heillecourt nous a permis, en premier lieu, de nous équiper progressivement en matériel de tir pour les nouveaux adhérents de l’association et d’un filet de protection obligatoire pour la salle.</p>
       <p className="obj__p">Rapidement, le club a fait l’acquisition de deux dispositifs « Arc-Cessible » permettant aux archers en situation de grand handicap de pouvoir pratiquer. Ce matériel est le résultat d’une collaboration entre l’association des « Archers sans Limite » et l’IUT de Villers les Nancy option matériaux composites. Il autorise d’excellentes performances, puisqu’à titre d’exemple, les mêmes dispositifs sont utilisés par des élèves de l’EREA de Flavigny. Ceux-ci se classent régulièrement parmi les trois premières places du championnat de France de tir à l’arc catégorie « sport partagé » qui regroupe des équipes de 4 archers avec deux valides et deux en situation de handicap.</p>
       <p className="obj__p">Ces dispositifs «arc-cessible» pour personnes à mobilité réduite sont par contre assez onéreux (1500 euros … notre subvention annuelle se montant elle à 900 euros) et nous n’en avons, pour le moment, pu en financer qu’un seul exemplaire. Le second exemplaire a été financé en grande partie par un don du Rotary Club de Saint Nicolas de Port.</p>
       <div className="div__img__paratir">
         <Image
        className='img__paratir'
        src="/images/paratir.webp"
        width={1000}
        height={600}
        alt="photo d'un Dispositif de support de maintien d'arc pour des handicapés Ayant des problèmes de bras" />
       <Image
        className='img__paratir'
        src="/images/nonvoyant.webp"
        width={1000}
        height={600}
        alt="photo d'un Dispositif pour la pratique du tir à l'arc des non voyant" />
        </div>
       </div>
      </section>
      <section className="localisation" id="localisation">
      <h2 className="localisation__title">Localisation du club</h2>
      <h3 className="localisation__subtitle">Au coeur du parc de l‘Embanie</h3>

      <p className="localisation__p">Totalement ouvert sur son environnement extérieur, le Grand Parc de l’Embanie offre un espace de promenade très agréable avec de grands espaces, des arbres remarquables, des aires de jeux et un espace dédié au sport, les ruisseaux du Moulin et de Frocourt, le pacage des poneys ou encore les jardins familiaux à l’entrée.</p>
 <Image
        className='img__localisation'
        src="/images/parc1.webp"
        width={668}
        height={450}
        alt="photo d'un paysage de Forêt avec un terrain de sport dans le fond" />
 <Image
        className='img__localisation'
        src="/images/parc3.webp"
        width={668}
        height={450}
        alt="photo d'un paysage d‘un lac avec de la verdure" />
      <p className="localisation__p">Un sentier de découverte du Grand Parc au départ de l’aire des manifestations permet d’apprécier 13 spécimens identifiés par une fiche signalétique. L’alignement remarquable de saules tétards qui bordent les ruisseaux de Frocourt et du Moulin est digne d’intérêt par le nombre de ses sujets en secteur urbain. Ils constituent en outre un réservoir naturel de biodiversité. Le port majestueux des chênes tricentenaires est visible depuis le chemin de la grande charrière ou du bois Banal pour s’en approcher au plus près. Un banc à chaque étape permet de se promener à tout âge, avec la possibilité de se reposer et d’admirer la faune et la flore environnantes</p>
      <Image
        className='img__localisation'
        src="/images/parc2.webp"
        width={668}
        height={450}
        alt="photo d'un paysage avec des jeux d’enfants " />
 <Image
        className='img__localisation'
        src="/images/parc4.webp"
        width={668}
        height={450}
        alt="photo d'un lac dans un parc avec des canards" />
      <p className="localisation__p">Autre point d‘intérêt du parc , l’étang de l’Embanie, plan d’eau artificiel de 3000 m2 et de 2 mètres de profondeur créé fin 1970. Il est alimenté par le ruisseau du Moulin. Les berges de l’étang sont couvertes d’une végétation variée où essences rares (Cyprès chauve), arbustes chatoyants et herbes luxuriantes se mélangent harmonieusement. Ce site abrite de nombreuses espèces végétales et animales, caractéristiques du patrimoine naturel régional. Il offre des paysages variés au gré des saisons.</p>
      <p className="localisation__p">Le Parc de l’Embanie est aussi un lieu de vie et d’animations pour les familles avec des manifestations régulières comme Saveurs Nature, la chasse aux œufs de Pâques ou encore les feux de la Saint-Jean.</p>

      <h3 className="localisation__subtitle">Le Gymnase</h3>
      <div className="div"> 
        <Image
        className='img__localisation__center'
        src="/images/gymnase.webp"
        width={630}
        height={460}
        alt="photo du gymnase avec a premier plan la foret " />
        </div>
     
<p className="localisation__p">Le Gymnase se trouve au coeur du parc de l‘Embanie. C‘est l’endroit ou se déroule la plupart des entraînements.  </p>
<h4>Les entraînements on lieu : </h4>
      </section>

    </>
  );
}
