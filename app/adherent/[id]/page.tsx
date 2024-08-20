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
interface RecentScore {
  id_score: number;
  date_tournoi: string;
  categorie: string;
  total_score: number;
}
interface Adversaire {
  nom: string;
  prenom: string;
  id_licence: string;
  total_score: number;
}

interface Adh {
  nom: string;
  prenom: string;
  main_dominante: string;
  type_arc: string;
}

const Adherent = () => {
  const params = useParams();
  const id = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [Adh, setAdh] = useState<Adh | null>(null);
  const [bestScore, setBestScore] = useState<BestScore | null>(null);
  const [recentScores, setRecentScores] = useState<RecentScore[]>([]);
  const [adversaires, setAdversaires] = useState<Adversaire[]>([]);
  const [progression, setProgression] = useState<{
    count9: number;
    count10: number;
    dateTournoi: string;
  } | null>(null);
  const [nbr10, setNbr10] = useState(1);
  const [nbr9, setNbr9] = useState(10);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Récupération des Données Adhérents
        const adhResponse = await fetch(`/api/adherent/${id}`);
        if (adhResponse.ok) {
          const userData = await adhResponse.json();
          setAdh(userData);
        } else {
          console.error(
            "Erreur lors de la récupération des données utilisateur"
          );
        }

        // Récupération du meilleur score
        const scoreResponse = await fetch(`/api/adherent/${id}/scores/best`);
        if (scoreResponse.ok) {
          const scoreData = await scoreResponse.json();
          setBestScore(scoreData);
        } else {
          console.error("Erreur lors de la récupération du meilleur score");
        }

        // Récupération des scores récents
        const recentScoresResponse = await fetch(
          `/api/adherent/${id}/scores/recent`
        );
        if (recentScoresResponse.ok) {
          const recentScoresData = await recentScoresResponse.json();
          setRecentScores(recentScoresData);
        } else {
          console.error("Erreur lors de la récupération des scores récents");
          setRecentScores([]);
        }
        // Récupération des adversaires
        const adversairesResponse = await fetch(
          `/api/adherent/${id}/scores/adversaire`
        );
        if (adversairesResponse.ok) {
          const adversairesData = await adversairesResponse.json();
          setAdversaires(adversairesData);
        } else {
          console.error("Erreur lors de la récupération des adversaires");
          setAdversaires([]);
        }
        // Récupération des données de progression
        const progressionResponse = await fetch(
          `/api/adherent/${id}/scores/progression`
        );
        if (progressionResponse.ok) {
          const progressionData = await progressionResponse.json();
          setProgression(progressionData);
        } else {
          console.error(
            "Erreur lors de la récupération des données de progression"
          );
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

  if (!Adh) {
    return <div>Utilisateur non trouvé</div>;
  }

  const handleNbr10Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgression((prev) =>
      prev ? { ...prev, count10: Number(e.target.value) } : null
    );
  };

  const handleNbr9Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgression((prev) =>
      prev ? { ...prev, count9: Number(e.target.value) } : null
    );
  };

  return (
    <>
      <section className="intro">
        <h2 className="intro__title">Espace Adhérents </h2>
        <h3 className="intro__subtitle">
          Bienvenue, {Adh.prenom} {Adh.nom}
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
          Votre main dominante est la {Adh.main_dominante}
        </p>
        <p className="feuille__score__stat__p">
          {Adh.type_arc !== "Non spécifié"
            ? `Vous utilisez un arc ${Adh.type_arc}`
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
                    date de tournoi
                  </th>
                  <th className="listadh__table__thead__tr__th" scope="col">
                    Catégorie
                  </th>
                  <th className="listadh__table__thead__tr__th" scope="col">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody className="listadh__table__body">
                {/* Données du Tableau */}

                {recentScores.length > 0 ? (
                  recentScores.map((score, index) => (
                    <tr key={index}>
                      <td>{score.date_tournoi}</td>
                      <td>{score.categorie}</td>
                      <td>{score.total_score}/600</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>Aucun résultat disponible</td>
                  </tr>
                )}
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
                {adversaires.map((adversaire, index) => (
                  <tr key={index}>
                    <td>{`${adversaire.prenom} ${adversaire.nom}`}</td>
                    <td>{adversaire.total_score}/600</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
      <section className="feuille__score__progression">
        <h5>Ma progression</h5>
        {progression ? (
          progression.count10 === 0 && progression.count9 === 0 ? (
            <p>Aucun score disponible</p>
          ) : (
            <>
              <div className="progression__container">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${(progression.count10 / 60) * 100}%` }}
                  ></div>
                  <label className="progress-label">
                    Nombre de 10: {progression.count10}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="60"
                    value={progression.count10}
                    onChange={handleNbr10Change}
                  />
                </div>
              </div>
              <div className="progression__container">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${(progression.count9 / 60) * 100}%` }}
                  ></div>
                  <label className="progress-label">
                    Nombre de 9: {progression.count9}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="60"
                    value={progression.count9}
                    onChange={handleNbr9Change}
                  />
                </div>
              </div>
            </>
          )
        ) : (
          <p>Nous n‘avons pas de données de progression...</p>
        )}
      </section>
    </>
  );
};
export default Adherent;
