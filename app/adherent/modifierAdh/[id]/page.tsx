"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";

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

const ModifierAdh = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [adh, setAdh] = useState<Adherent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdh = async () => {
      try {
        const response = await fetch(`/api/adherent/${params.id}`);
        if (!response.ok) {
          throw new Error("Échec de la récupération de l'adhérent");
        }
        const data: Adherent = await response.json();
        setAdh(data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'adhérent :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdh();
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (adh) {
      setAdh({
        ...adh,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adh) return;

    const formattedDate = new Date(adh.date_naissance).toISOString();

    try {
      const response = await fetch(`/api/adherent/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: adh.nom,
          prenom: adh.prenom,
          genre: adh.genre,
          date_naissance: formattedDate, // Envoyer en format ISO
          num_tel: adh.num_tel,
          email: adh.email,
          pseudo: adh.pseudo,
          ville: adh.ville,
          main_dominante: adh.main_dominante,
          type_arc: adh.type_arc,
        }),
      });
      if (!response.ok) {
        throw new Error("Échec de la mise à jour de l'adhérent");
      }
      router.push("/admin");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'adhérent :", error);
    }
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!adh) {
    return <p>Adhérent non trouvé</p>;
  }

  return (
    <>
      <h2>Modifie ton Adhérent</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nom">Nom:</label>
          <input
            type="text"
            name="nom"
            value={adh.nom}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="prenom">Prénom:</label>
          <input
            type="text"
            name="prenom"
            value={adh.prenom}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            name="genre"
            value={adh.genre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="date_naissance">Date de Naissance:</label>
          <input
            type="date"
            name="date_naissance"
            value={formatDate(new Date(adh.date_naissance))}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="num_tel">Numéro de Téléphone:</label>
          <input
            type="tel"
            name="num_tel"
            value={adh.num_tel}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={adh.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="pseudo">Pseudo:</label>
          <input
            type="text"
            name="pseudo"
            value={adh.pseudo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="ville">Ville:</label>
          <input
            type="text"
            name="ville"
            value={adh.ville}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="main_dominante">Main Dominante:</label>
          <input
            type="text"
            name="main_dominante"
            value={adh.main_dominante}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="type_arc">Type d‘arc:</label>
          <input
            type="text"
            name="type_arc"
            value={adh.type_arc}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn" type="submit">
          Mettre à jour
        </button>
      </form>
    </>
  );
};

export default ModifierAdh;
