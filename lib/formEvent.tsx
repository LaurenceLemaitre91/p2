"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const FormEvent: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nom: "",
    date_evt: "",
    date_creation: new Date().toISOString().split("T")[0], // Set to today's date in YYYY-MM-DD format
    description: "",
  });
  const [erreur, setErreur] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin");
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
        <label htmlFor="nom">Nom de l‘évènement</label>
        <input
          id="nom"
          type="text"
          name="nom"
          placeholder="Le nom de l'Évènement"
          required
          value={formData.nom}
          onChange={handleChange}
        />

        <label htmlFor="date_evt">Date de l‘évènement</label>
        <input
          id="date_evt"
          type="date"
          name="date_evt"
          placeholder="Date de l’évènement"
          required
          value={formData.date_evt}
          onChange={handleChange}
        />

        <label htmlFor="desc">Description de l‘évènement</label>
        <textarea
          rows={20}
          cols={50}
          name="description" // Ensure this matches the API's expected field
          id="desc"
          required
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        <div>
          <button className="btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Envoi en cours..." : "Ajouter l’évènement "}
          </button>
        </div>

        {erreur && <p style={{ color: "red" }}>{erreur}</p>}
      </form>
    </>
  );
};

export default FormEvent;
