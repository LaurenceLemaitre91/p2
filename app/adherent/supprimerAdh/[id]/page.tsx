"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

type Adherent = {
  id_licence: string;
  nom: string;
  prenom: string;
  genre: string;
  date_naissance: string;
  num_tel: string;
  email: string;
  pseudo: string;
  ville: string;
  main_dominante: string;
  type_arc: string;
};

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const SupprimerAdh = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [adh, setAdh] = useState<Adherent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAdherent = async () => {
      try {
        const response = await fetch(`/api/adherent/${params.id}`);
        if (!response.ok) {
          throw new Error("Échec de la récupération de l'adhérent");
        }
        const data: Adherent = await response.json();
        setAdh(data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'adhérent :", error);
        setError("Erreur lors de la récupération de l'adhérent");
      }
    };

    fetchAdherent();
  }, [params.id]);

  const handleDelete = async () => {
    setLoading(true);
    setError(null); // Reset the error state before attempting the delete
    try {
      const response = await fetch(`/api/adherent/${params.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(
          result.error || "Échec de la suppression de l'adhérent"
        );
      }

      router.push("/admin");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div>
        <p style={{ color: "red" }}>{error}</p>
        <button className="btn" onClick={() => router.push("/admin")}>
          Retour
        </button>
      </div>
    );
  }

  if (!adh) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <h2>Supprimer l‘adhérent</h2>
      <p>
        Êtes-vous sûr de vouloir supprimer cet adhérent ? Cette action est
        irréversible.
      </p>
      <table className="listadh__table">
        <thead className="listadh__table__thead">
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
              Type d‘arc
            </th>
          </tr>
        </thead>
        <tbody className="listadh__table__body">
          <tr>
            <td>{adh.nom}</td>
            <td>{adh.prenom}</td>
            <td>{adh.genre}</td>
            <td>
              {adh.date_naissance
                ? formatDate(new Date(adh.date_naissance))
                : "N/A"}
            </td>
            <td>{adh.num_tel}</td>
            <td>{adh.email}</td>
            <td>{adh.pseudo}</td>
            <td>{adh.ville}</td>
            <td>{adh.main_dominante}</td>
            <td>{adh.type_arc}</td>
          </tr>
        </tbody>
      </table>
      <div className="btn_admin">
        <button className="btn" onClick={handleDelete} disabled={loading}>
          {loading ? "Suppression..." : "Supprimer"}
        </button>
        <button
          className="btn"
          onClick={() => router.push("/admin")}
          disabled={loading}
        >
          Annuler
        </button>
      </div>
    </div>
  );
};

export default SupprimerAdh;
