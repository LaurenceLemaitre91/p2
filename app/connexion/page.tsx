// app/connexion/page.tsx
"use client"; // Indique que ce composant est un composant client
import Link from "next/link";
import { FormEvent, useState } from "react";
// Utilisez 'next/navigation' pour les composants client
import { useRouter } from "next/navigation";

const Connexion = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Réinitialiser le message d'erreur
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const pseudo = formData.get("pseudo") as string;
    const mdp = formData.get("mdp") as string;

    // Validation simple côté client
    if (!pseudo || !mdp) {
      setErrorMessage("Identifiant et mot de passe requis.");
      return;
    }
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pseudo, mdp }),
    });
    console.log("Statut de la réponse :", response.status);
    console.log("Réponse du serveur :", await response.text());

    if (response.ok) {
      router.push("/adherent");
    } else {
      setErrorMessage("Une erreur est survenue.");
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
