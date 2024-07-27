import Link from 'next/link';  // Importation du composant Link de Next.js pour la navigation entre les pages.
const Connexion = () => {
  return (
    <>
 <Link href={'inscription'}>Je veux minscrire !</Link>
   
      <h2>Connexion à votre compte</h2>
     <form method="post" action="formConnexion.js">
     
      <label htmlFor="identifiantq">Votre identifiant</label>
<input id='identifiant'  type="text" name="identifiant" placeholder="Votre identifiant" required/>


      <label htmlFor="mdp">Votre mot de passe </label>
<input id='mdp'  type="text" name="mdp" placeholder="Votre mot de passe" required/>

<div>
  <button className='btn' type="submit">Connexion</button>
</div>
     </form>   
     
   
    </>
  );
};

export default Connexion;
