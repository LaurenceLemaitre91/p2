"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { useState, useEffect } from "react";

type Event = {
  id_evt: number;
  nom: string;
  date_evt: string;
  description: string;
};

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const SupprimerEvent = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // RÉCUPÉRATION DE L ÉVÈNEMENT
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${params.id}`);
        if (!response.ok) {
          throw new Error("Échec de la récupération de l'événement");
        }
        const data: Event = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'événement :", error);
        setError("Erreur lors de la récupération de l'événement");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.id]);

  // SUPPRIMER L ÉVÈNEMENT
  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/events/${params.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Échec de la suppression de l'événement");
      }
      router.push("/admin");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'événement :", error);
      setError("Erreur lors de la suppression de l'événement");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!event) {
    return <p>Événement non trouvé</p>;
  }

  return (
    <div>
      <h2>Supprimer l’évènement </h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Êtes-vous sûr de vouloir supprimer cet événement ? Cette action est
        irréversible.
      </p>
      <table className="listevts__table">
        <thead className="listevts__table__thead">
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
          </tr>
        </thead>
        <tbody className="listevts__table__body">
          <tr>
            <td>{formatDate(new Date(event.date_evt))}</td>
            <td>{event.nom}</td>
            <td>{event.description}</td>
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

export default SupprimerEvent;
