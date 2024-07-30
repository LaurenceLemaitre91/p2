// app/connexion/page.tsx
"use client"; // Indique que ce composant est un composant client
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation"; // Utilisez 'next/navigation' pour les composants client

const Connexion = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null); // Réinitialiser le message d'erreur

    const formData = new FormData(event.currentTarget);
    const pseudo = formData.get("pseudo") as string;
    const mdp = formData.get("mdp") as string;

    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pseudo, mdp }),
    });

    if (response.ok) {
      router.push("/adherent");
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.error || "Une erreur est survenue.");
    }
  }
  return (
    <>
      <Link href="inscription">Je veux m‘inscrire !</Link>{" "}
      {/* Lien vers la page d'inscription */}
      <h2>Connexion à votre compte</h2> {/* Titre de la page */}
      <form method="POST" onSubmit={handleSubmit}>
        {" "}
        {/* Formulaire de connexion */}
        <label htmlFor="pseudo">Votre identifiant</label>
        <input
          id="pseudo"
          type="text"
          name="pseudo"
          placeholder="Votre identifiant"
          required
        />
        <label htmlFor="mdp">Votre mot de passe </label>
        <input
          id="mdp"
          type="password"
          name="mdp"
          placeholder="Votre mot de passe"
          required
        />
        {/* Affichage du message d'erreur si nécessaire */}
        <div>
          <button className="btn" type="submit">
            {" "}
            {/* Bouton de soumission */}
            Connexion
          </button>
        </div>
      </form>
    </>
  );
};

// Exportation par défaut du composant Connexion
export default Connexion;
