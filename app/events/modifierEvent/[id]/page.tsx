"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";

type Evenement = {
  id_evt: number;
  nom: string;
  date_evt: string; // Utiliser le format ISO pour stocker les dates
  description: string;
};

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const ModifierEvent = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [event, setEvent] = useState<Evenement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${params.id}`);
        if (!response.ok) {
          throw new Error("Échec de la récupération de l'événement");
        }
        const data: Evenement = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'événement :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event) {
      setEvent({
        ...event,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;

    const formattedDate = new Date(event.date_evt).toISOString(); // standardise la date dans un format compatible avec la plupart des bases de données

    try {
      const response = await fetch(`/api/events/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: event.nom,
          date_evt: formattedDate, // Envoyer en format ISO
          description: event.description,
        }),
      });
      if (!response.ok) {
        throw new Error("Échec de la mise à jour de l'événement");
      }
      router.push("/admin");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'événement :", error);
    }
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!event) {
    return <p>Événement non trouvé</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nom :
        <input
          type="text"
          name="nom"
          value={event.nom}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Date :
        <input
          type="date"
          name="date_evt"
          value={formatDate(new Date(event.date_evt))}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Description :
        <textarea
          name="description"
          value={event.description}
          onChange={handleChange}
          required
        />
      </label>
      <button className="btn" type="submit">
        Mettre à jour
      </button>
    </form>
  );
};

export default ModifierEvent;
