"use client"; // Indique que ce composant est un composant client
import { Adherent } from "@prisma/client";
// Importation du composant Link de Next.js pour la navigation entre les pages.
import Link from "next/link";

// Importation des hooks useEffect et useState de React
import { useEffect, useState } from "react";

// Définir le type TypeScript pour les événements
type Evenement = {
  id_evt: number; // Identifiant unique de l'événement
  nom: string; // Nom de l'événement
  date_evt: Date; // Date de l'événement
  date_creation: Date; // Date de création de l'événement
  description: string; // Description de l'événement
};

// Fonction pour formater les dates au format français
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

export default function Admin() {
  // -------------- RÉCUPÉRATION DES ÉVÈNEMENTS ---------------------------------
  // Déclaration du state pour stocker les événements récupérés
  const [events, setEvents] = useState<Evenement[]>([]);

  //récupérer les événements depuis l'API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events/all-events");
        if (!response.ok) {
          throw new Error("Le Serveur ne repond pas");
        }
        const eventsData: Evenement[] = await response.json();
        setEvents(eventsData);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents(); // Appeler la fonction fetchEvents lors du montage du composant
  }, []); // qu'une seule fois, lors du montage
  //-----------------------------------------------------------------------------

  // -------------- RÉCUPÉRATION DES ADHÉRENTS ---------------------------------
  // Déclaration du state pour stocker les événements récupérés
  const [adhs, setAdhs] = useState<Adherent[]>([]);

  //récupérer les événements depuis l'API
  useEffect(() => {
    const fetchAdhs = async () => {
      try {
        // Appel à l'API pour récupérer les événements
        const response = await fetch("/api/adherent");
        if (!response.ok) {
          // Gestion des erreurs de réponse réseau
          throw new Error("Le Serveur ne repond pas");
        }
        const adhsData: Adherent[] = await response.json(); // Analyse de la réponse JSON
        setAdhs(adhsData); // Mise à jour du state avec les événements récupérés
      } catch (error) {
        console.error("Failed to fetch events:", error); // Gestion des erreurs de récupération des événements
      }
    };

    fetchAdhs(); // Appeler la fonction fetchAdhs lors du montage du composant
  }, []); // Le tableau vide [] indique que cet effet ne doit s'exécuter qu'une seule fois, lors du montage
  //-----------------------------------------------------------------------------
  return (
    <>
      <section className="intro">
        <h2 className="intro__title">Votre espace administrateur</h2>
        <p className="intro__p">
          Depuis cette espace, vous pouvez voir la liste des adhérents, les
          ajouter, les modifier ou les supprimer. Vous pouvez également voir la
          liste des événements du club. vous pouvez en rajouter, modifier ceux
          déjà créer ou les supprimer.
        </p>
      </section>
      <section className="listadh">
        <h3 className="listadh__title">Liste des adhérents</h3>

        {/* Tableau des Adhérents */}
        <table className="listadh__table">
          <thead className="listadh__table__thead">
            {/* En-tête du Tableau */}
            <tr className="listadh__table__thead__tr">
              <th className="listadh__table__thead__tr__th" scope="col">
                Nom
              </th>
              <th className="listadh__table__thead__tr__th" scope="col">
                Prénom
              </th>
              <th className="listadh__table__thead__tr__th" scope="col">
                Genre
              </th>
              <th className="listadh__table__thead__tr__th" scope="col">
                Date de naissance
              </th>
              <th className="listadh__table__thead__tr__th" scope="col">
                N° de téléphone
              </th>
              <th className="listadh__table__thead__tr__th" scope="col">
                E-mail
              </th>
              <th className="listadh__table__thead__tr__th" scope="col">
                Pseudo
              </th>
              <th className="listadh__table__thead__tr__th" scope="col">
                Ville
              </th>
              <th className="listadh__table__thead__tr__th" scope="col">
                Main dominante
              </th>
              <th className="listadh__table__thead__tr__th" scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="listadh__table__body">
            {/* Données du Tableau */}
            {adhs.map((event, index) => (
              <tr
                key={event.id_licence}
                // Appliquer une classe différente pour chaque ligne paire et impaire
                // si paire = bleu sinon Blanc
                // % modulo renvoie le Reste de a Division si index % 2 === 0 pair sinon impaire
                className={index % 2 === 0 ? "bleu" : "blanc"}
              >
                <td>{event.nom}</td>
                <td>{event.prenom}</td>
                <td>{event.genre}</td>
                {/* Cela affiche "N/A" si date_naissance est null format Français */}
                <td>
                  {event.date_naissance
                    ? formatDate(new Date(event.date_naissance))
                    : "N/A"}
                </td>

                <td>{event.num_tel}</td>
                <td>{event.email}</td>
                <td>{event.pseudo}</td>
                <td>{event.ville}</td>
                <td>{event.main_dominante}</td>
                <td>
                  <a href={`/modifier/${event.id_licence}`} className="">
                    Modifier
                  </a>
                  <a href={`/supprimer/${event.id_licence}`} className="">
                    Supprimer
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <section className="btn_admin">
          <Link href="/ajoutAdh" className="btn">
            Ajouter un adhérent
          </Link>
        </section>
      </section>

      <section className="listevts">
        <h3 className="listevts__title">Liste des événements du club</h3>
        <table className="listevts__table">
          <thead className="listevts__table__thead">
            {/* En-tête du Tableau */}
            <tr className="listevts__table__thead__tr">
              <th className="listevts__table__thead__tr__th" scope="col">
                Date de l’évènement
              </th>
              <th className="listevts__table__thead__tr__th" scope="col">
                Nom
              </th>
              <th className="listevts__table__thead__tr__th" scope="col">
                Description
              </th>
              <th className="listevts__table__thead__tr__th" scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="listevts__table__body">
            {/* Affichage des événements récupérés */}
            {events.map((event, index) => (
              <tr
                key={event.id_evt}
                // Appliquer une classe différente pour chaque ligne paire et impaire
                // si paire = bleu sinon Blanc
                // % modulo renvoie le Reste de a Division si index % 2 === 0 pair sinon impaire
                className={index % 2 === 0 ? "bleu" : "blanc"}
              >
                <td>{formatDate(new Date(event.date_evt))}</td>
                <td>{event.nom}</td>
                <td>{event.description}</td>
                <td>
                  <a href={`events/modifierEvent/${event.id_evt}`}>Modifier</a>
                  <a href={`/supprimerEvent/${event.id_evt}`}>Supprimer</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="btn_admin">
        <Link href="/ajoutEvent" className="btn">
          Ajouter un Évènement
        </Link>
      </section>
    </>
  );
}
