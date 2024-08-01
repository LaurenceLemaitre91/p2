"use client"; // Indique que ce composant est un composant client
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
        // Appel à l'API pour récupérer les événements
        const response = await fetch("/api/events");
        if (!response.ok) {
          throw new Error("Network response was not ok"); // Gestion des erreurs de réponse réseau
        }
        const eventsData: Evenement[] = await response.json(); // Analyse de la réponse JSON
        setEvents(eventsData); // Mise à jour du state avec les événements récupérés
      } catch (error) {
        console.error("Failed to fetch events:", error); // Gestion des erreurs de récupération des événements
      }
    };

    fetchEvents(); // Appeler la fonction fetchEvents lors du montage du composant
  }, []); // Le tableau vide [] indique que cet effet ne doit s'exécuter qu'une seule fois, lors du montage
  //--------------------------------------------------------------------------------------
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
                Ville{" "}
              </th>
              <th className="listadh__table__thead__tr__th" scope="col">
                Main dominante
              </th>
              <th className="listadh__table__thead__tr__th" scope="col">
                Type d’arc
              </th>
            </tr>
          </thead>
          <tbody className="listadh__table__body">
            {/* Données du Tableau */}
            <tr className="listadh__table__body__tr">
              <td className="listadh__table__body__tr__td">Mex</td>
              <td className="listadh__table__body__tr__td">Bruno</td>
              <td className="listadh__table__body__tr__td">Homme</td>
              <td className="listadh__table__body__tr__td">21/08/1978</td>
              <td className="listadh__table__body__tr__td">0789654311</td>
              <td className="listadh__table__body__tr__td">bruno@free.fr</td>
              <td className="listadh__table__body__tr__td">Brutus</td>
              <td className="listadh__table__body__tr__td">Paris</td>
              <td className="listadh__table__body__tr__td">Droite</td>
              <td className="listadh__table__body__tr__td">Simple</td>
            </tr>
          </tbody>
        </table>
        <section className="btn_admin">
          <button className="btn">Ajouter un adhérent</button>
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
                  <a href={`/modifier/${event.id_evt}`} className="">
                    Modifier
                  </a>
                  <a href={`/supprimer/${event.id_evt}`} className="">
                    Supprimer
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="btn_admin">
        <button className="btn">Ajouter un évènement </button>
      </section>
    </>
  );
}
