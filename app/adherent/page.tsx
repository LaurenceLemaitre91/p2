"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Adherent = () => {
  const [user, setUser] = useState<null | {
    nom: string;
    prenom: string;
    main_dominante: string;
    type_arc: string;
  }>(null);

  useEffect(() => {
    // Récupérer les informations de l'utilisateur à partir du cookie
    const userCookie = Cookies.get("user");
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
  }, []);

  if (!user) {
    return <p>Chargement...</p>;
  }
  return (
    <>
      <section className="intro">
        <h2 className="intro__title">Espace Adhérents </h2>
        <h3 className="intro__subtitle">
          Bienvenue, {user.prenom} {user.nom},
        </h3>
        <h4>Votre main dominante est la {user.main_dominante}</h4>
        <p className="intro__p">
          Bienvenue sur votre espace adhérent, depuis cette espace vous pouvez
          visualiser l‘ensemble de vos résultats. Votre meilleure score, vos
          dernières compétitions, vos principaux adversaires, votre progression
          avec votre nombre de 10 et de 9.
        </p>
      </section>
      <section className="score">
        <h4>Votre meilleur score</h4>
        <div className="score_div"></div>
      </section>
    </>
  );
};

export default Adherent;
