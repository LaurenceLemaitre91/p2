"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const FormInscription: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id_licence: "",
    nom: "",
    prenom: "",
    genre: "",
    date_naissance: "",
    num_tel: "",
    email: "",
    pseudo: "",
    mdp: "",
    ville: "",
    main_dominante: "",
    type_arc: "",
  });
  const [erreur, setErreur] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/adherent", {
        method: "POST",
        body: new FormData(e.currentTarget),
      });

      if (response.ok) {
        router.push("/connexion");
      } else {
        const result = await response.json();
        setErreur(
          result.error
            ? JSON.stringify(result.error)
            : "Erreur lors de l’inscription"
        );
      }
    } catch (error) {
      console.error("Erreur lors de l’inscription :", error);
      setErreur("Erreur lors de l’inscription");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="id_licence">Mon numéro de Licence</label>
        <input
          id="id_licence"
          type="text"
          name="id_licence"
          placeholder="N° de licence"
          required
          autoComplete="off"
          value={formData.id_licence}
          onChange={handleChange}
        />

        <label htmlFor="nom">Votre nom</label>
        <input
          id="nom"
          type="text"
          name="nom"
          placeholder="Votre nom"
          required
          autoComplete="name"
          value={formData.nom}
          onChange={handleChange}
        />

        <label htmlFor="prenom">Votre prénom</label>
        <input
          id="prenom"
          type="text"
          name="prenom"
          placeholder="Votre prénom"
          required
          autoComplete="given-name"
          value={formData.prenom}
          onChange={handleChange}
        />

        <label htmlFor="genre">Votre genre</label>
        <select
          name="genre"
          id="genre"
          required
          value={formData.genre}
          onChange={handleChange}
        >
          <option value="">--Choisissez votre genre--</option>
          <option value="Femme">Femme</option>
          <option value="Homme">Homme</option>
          <option value="Autre">Autre</option>
        </select>

        <label htmlFor="date_naissance">Votre date de naissance</label>
        <input
          id="date_naissance"
          type="date"
          name="date_naissance"
          placeholder="Votre date de naissance"
          required
          autoComplete="bday"
          value={formData.date_naissance}
          onChange={handleChange}
        />

        <label htmlFor="tel">Votre numéro de téléphone</label>
        <input
          id="tel"
          type="tel"
          name="num_tel"
          placeholder="Votre numéro de téléphone"
          autoComplete="tel"
          value={formData.num_tel}
          onChange={handleChange}
        />

        <label htmlFor="email">Votre adresse mail</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Votre adresse mail"
          required
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="pseudo">Votre identifiant</label>
        <input
          id="pseudo"
          type="text"
          name="pseudo"
          placeholder="L'identifiant de votre compte"
          required
          autoComplete="username"
          value={formData.pseudo}
          onChange={handleChange}
        />

        <label htmlFor="mdp">Votre mot de passe</label>
        <input
          id="mdp"
          type="password"
          name="mdp"
          placeholder="Le mot de passe de votre compte"
          required
          autoComplete="new-password"
          value={formData.mdp}
          onChange={handleChange}
        />

        <label htmlFor="ville">Votre ville de résidence</label>
        <input
          id="ville"
          type="text"
          name="ville"
          placeholder="Votre ville"
          autoComplete="address-level2"
          value={formData.ville}
          onChange={handleChange}
        />

        <fieldset>
          <legend>Votre main dominante</legend>
          <input
            className="checkbox"
            type="radio"
            id="droite"
            name="main_dominante"
            value="droite"
            checked={formData.main_dominante === "droite"}
            onChange={handleChange}
          />
          <label htmlFor="droite">Droite</label>
          <input
            className="checkbox"
            type="radio"
            id="gauche"
            name="main_dominante"
            value="gauche"
            checked={formData.main_dominante === "gauche"}
            onChange={handleChange}
          />
          <label htmlFor="gauche">Gauche</label>
        </fieldset>
        <label htmlFor="type_arc">Votre type d‘arc</label>
        <select
          name="type_arc"
          id="type_arc"
          value={formData.type_arc}
          onChange={handleChange}
        >
          <option value="">--Choisissez votre arc--</option>
          <option value="simple">Simple</option>
          <option value="A poulie">A poulie</option>
        </select>
        <div>
          <button className="btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Envoi en cours..." : "Inscription"}
          </button>
        </div>

        {erreur && <p style={{ color: "red" }}>{erreur}</p>}
      </form>
    </>
  );
};

export default FormInscription;
