"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import React from "react";
import Image from "next/image";

interface BestScore {
  id_score: number;
  date_tournoi: string;
  categorie: string;
  lieu: string;
  total_score: number;
}

interface User {
  nom: string;
  prenom: string;
  main_dominante: string;
  type_arc: string;
}

const Adherent = () => {
  const params = useParams();
  const id = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [bestScore, setBestScore] = useState<BestScore | null>(null);
  const [nbr10, setNbr10] = useState(1);
  const [nbr9, setNbr9] = useState(10);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch user data
        const userResponse = await fetch(`/api/adherent/${id}`);
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
        } else {
          console.error(
            "Erreur lors de la récupération des données utilisateur"
          );
        }

        // Fetch best score
        const scoreResponse = await fetch(`/api/adherent/${id}/score/best`);
        if (scoreResponse.ok) {
          const scoreData = await scoreResponse.json();
          setBestScore(scoreData);
        } else {
          console.error("Erreur lors de la récupération du meilleur score");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return <div>Utilisateur non trouvé</div>;
  }
  const handleNbr10Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNbr10(Number(e.target.value));
  };

  const handleNbr9Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNbr9(Number(e.target.value));
  };

  return (
    <>
      <section className="intro">
        <h2 className="intro__title">Espace Adhérents </h2>
        <h3 className="intro__subtitle">
          Bienvenue, {user.prenom} {user.nom}
        </h3>
        <p className="intro__p">
          Bienvenue sur votre espace adhérent, depuis cet espace vous pouvez
          visualiser l‘ensemble de vos résultats. Votre meilleur score, vos
          dernières compétitions, vos principaux adversaires, votre progression
          avec votre nombre de 10 et de 9.
        </p>
      </section>
      <section className="feuille__score__stat">
        <p className="feuille__score__stat__p">
          Votre main dominante est la {user.main_dominante}
        </p>
        <p className="feuille__score__stat__p">
          {user.type_arc !== "Non spécifié"
            ? `Vous utilisez un arc ${user.type_arc}`
            : "Type d'arc non spécifié"}
        </p>
      </section>
      <section className="feuille__score__result__container">
        <section className="feuille__score__result ">
          <div className="feuille__score__div">
            <h5>Meilleur score</h5>
            <Image
              src="/icon/medaille.png"
              alt="medaille"
              width={160}
              height={160}
            />
            {bestScore ? (
              <>
                <div className="score__img">
                  <p className="score__div__p">{bestScore.total_score}/600</p>
                </div>
              </>
            ) : (
              <p>Aucun score disponible</p>
            )}
          </div>
        </section>
        <section className="feuille__score__result">
          <h5>Mes derniers résultats</h5>
          <div className="feuille__table__container">
            <table className="listadh__table">
              <thead className="listadh__table__thead">
                {/* En-tête du Tableau */}
                <tr className="listadh__table__thead__tr">
                  <th className="listadh__table__thead__tr__th" scope="col">
                    Compétition
                  </th>
                  <th className="listadh__table__thead__tr__th" scope="col">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody className="listadh__table__body">
                {/* Données du Tableau */}
                <tr>
                  <td>Compétition 1</td>
                  <td>552/600</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="feuille__score__result">
          <h5>Mes principaux adversaires</h5>
          <div className="feuille__table__container">
            <table className="listadh__table">
              <thead className="listadh__table__thead">
                {/* En-tête du Tableau */}
                <tr className="listadh__table__thead__tr">
                  <th className="listadh__table__thead__tr__th" scope="col">
                    Nom
                  </th>
                  <th className="listadh__table__thead__tr__th" scope="col">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody className="listadh__table__body">
                {/* Données du Tableau */}
                <tr>
                  <td>Alex TOR</td>
                  <td>552/600</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </section>
      <section className="feuille__score__progression">
        <h5>Ma progression</h5>

        <div className="progression__container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(nbr10 / 60) * 100}%` }}
            ></div>
            <label className="progress-label">Nombre de 10: {nbr10}</label>
            <input
              type="range"
              min="0"
              max="60"
              value={nbr10}
              onChange={handleNbr10Change}
            />
          </div>
        </div>

        <div className="progression__container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              // Pourcentage de remplissage
              style={{ width: `${(nbr9 / 60) * 100}%` }}
            ></div>
            <label className="progress-label">Nombre de 9: {nbr9}</label>
            <input
              type="range"
              min="0"
              max="60"
              value={nbr9}
              onChange={handleNbr9Change}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Adherent;
