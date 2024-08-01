// app/connexion/page.tsx
"use client"; // Indique que ce composant est un composant client
import Link from "next/link";
import { FormEvent, useState } from "react";
// Utilisez 'next/navigation' pour les composants client
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Connexion = () => {
  // Utilisation du hook useRouter pour obtenir l'instance du routeur Next.js
  const router = useRouter();
  // Utilisation du hook useState pour gérer le message d'erreur, initialisé à null
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // ----- Fonction pour gérer la soumission du formulaire ----------
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Empêche le comportement par défaut du formulaire (rechargement de la page)
    event.preventDefault();
    // Réinitialise le message d'erreur à null avant de traiter la soumission
    setErrorMessage(null);

    // Récupération des données du formulaire
    const formData = new FormData(event.currentTarget);
    // Extraction des valeurs de pseudo et mdp à partir des données du formulaire
    const pseudo = formData.get("pseudo") as string;
    const mdp = formData.get("mdp") as string;

    // Validation simple côté client pour vérifier que pseudo et mdp ne sont pas vides
    if (!pseudo || !mdp) {
      // Mise à jour du message d'erreur si l'un des champs est vide
      setErrorMessage("Identifiant et mot de passe requis.");
      return;
    }

    // Envoi d'une requête POST à l'API d'authentification avec les données du formulaire
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pseudo, mdp }),
    });

    const result = await response.json();
    console.log("Statut de la réponse :", response.status);
    console.log("Réponse du serveur :", result);

    // Si la réponse est OK (statut 200), redirection vers la page des adhérents
    if (response.ok) {
      // Stocker les informations de l'utilisateur dans un cookie
      Cookies.set("user", JSON.stringify(result.user), { expires: 1 });
      if (result.user.id_role === 2) {
        router.push("/admin");
      } else {
        router.push("/adherent");
      }
    } else {
      setErrorMessage(result.error || "Une erreur est survenue.");
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
        {errorMessage && <p>{errorMessage}</p>}
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
