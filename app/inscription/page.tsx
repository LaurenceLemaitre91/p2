import React from "react";
import FormInscription from "../../lib/formInscription";
import Link from "next/link";

export default function Inscription() {
  return (
    <>
      <h2>Votre Inscription</h2>
      <FormInscription />
      <Link className="btn" href={"/"}>
        Retour à l‘accueil
      </Link>
    </>
  );
}
