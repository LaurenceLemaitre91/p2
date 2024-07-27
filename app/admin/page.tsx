function admin() {
  return (
    <>
      <section className="intro">
        <h2 className="intro__title">Votre espace administrateur</h2>
        <p className="intro__p">
          Depuis cette espace, vous pouvez voir la liste des adhérents, les
          ajouter, les modifier ou les supprimer. Vous pouvez également voir la
          liste des événements du club. vous pouvez en rajouter, modifier ceux
          déjà creer ou les supprimer.
        </p>
      </section>
      <section className="listadh">
        <h3 className="listadh__title">Liste des adhérents</h3>

        {/*Tableau des Adhérents */}
        <table className="listadh__table">
          <thead className="listadh__table__thead">
            {/*En-tete du Tableau */}
            <tr className="listadh__table__thead__tr">
              <th className="listadh__table__thead__tr__th" scope="col">
                Nom
              </th>
              <th className="listadh__table__thead__tr__th" scope="col">
                Prénom
              </th>

              <th className="listadh__table__thead__tr__th" scope="col">
                Genre
              </th>
              <th className="listadh__table__thead__tr__th" scope="col">
                Date de naissance
              </th>
              <th className="listadh__table__thead__tr__th" scope="col">
                N° de téléphone
              </th>
              <th className="listadh__table__thead__tr__th" scope="col">
                E-mail
              </th>
              <th className="listadh__table__thead__tr__th" scope="col">
                Pseudo
              </th>
              <th className="listadh__table__thead__tr__th" scope="col">
                Ville{" "}
              </th>
              <th className="listadh__table__thead__tr__th" scope="col">
                Main dominante
              </th>
              <th className="listadh__table__thead__tr__th" scope="col">
                Type d‘arc
              </th>
            </tr>
          </thead>
          <tbody className="listadh__table__body">
            {/*Données du Tableau */}
            <tr className="listadh__table__body__tr">
              <td className="listadh__table__body__tr__td">Mex</td>
              <td className="listadh__table__body__tr__td">Bruno</td>
              <td className="listadh__table__body__tr__td">Homme</td>
              <td className="listadh__table__body__tr__td">21/08/1978</td>
              <td className="listadh__table__body__tr__td">0789654311</td>
              <td className="listadh__table__body__tr__td">bruno@free.fr</td>
              <td className="listadh__table__body__tr__td">Brutus</td>
              <td className="listadh__table__body__tr__td">Paris</td>
              <td className="listadh__table__body__tr__td">Droite</td>
              <td className="listadh__table__body__tr__td">Simple</td>
            </tr>
          </tbody>
        </table>
        <section className="btn_admin">
          <button className="btn">Ajouter un adhérent</button>
        </section>
      </section>

      <section className="listevts">
        <h3 className="listevts__title">Liste des événements du club</h3>
        <table className="listevts__table">
          <thead className="listevts__table__thead">
            {/*En-tete du Tableau */}
            <tr className="listevts__table__thead__tr">
              <th className="listevts__table__thead__tr__th" scope="col">
                Nom
              </th>
              <th className="listevts__table__thead__tr__th" scope="col">
                Date de création
              </th>

              <th className="listevts__table__thead__tr__th" scope="col">
                Date de l’évènement
              </th>
              <th className="listevts__table__thead__tr__th" scope="col">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="listevts__table__body">
            {/*Données du Tableau */}
            <tr className="listevts__table__body__tr">
              <td className="listevts__table__body__tr__td">
                Championnat de France para-tir
              </td>
              <td className="listevts__table__body__tr__td">01/07/2024</td>
              <td className="listevts__table__body__tr__td">06/07/2024</td>
              <td className="listevts__table__body__tr__td">
                Championnat de france à Fontainebleau{" "}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="btn_admin">
        <button className="btn">Ajouter un évènement </button>
      </section>
    </>
  );
}

export default admin;
