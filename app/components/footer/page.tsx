import date from '../../../lib/date';
import Link from 'next/link'
import Image from 'next/image';
function footer() {
  return (
    <>
    <footer className='footer'>
      <div className='footer__div'>
        <section className="footer__logo">
        <Link className='link__logo' href={'/'}>
           <Image
          className='img__header'
            src="/images/logo.png"
            width={90}
            height={90}
            alt="logo des archers sans limites"
          />
          </Link>
     </section>
     <section className='footer__link'>
     <Link  className='link' href={'../mentions.js'}>Mentions légales</Link>
     <Link className='link' href={'../accessible.js'}>Accessibilité</Link>
     <Link  className='link' href={'../contact.js'}>Contact</Link>
     </section>
     <section className='footer__adresse'>
          <p  className='footer__adresse__p'>Gymnase de l Embanie</p>
          <p className='footer__adresse__p'>Chem. de l Embanie</p>
          <p  className='footer__adresse__p'>58180 Heillecourt</p>
     </section>
      </div>
     <div className='copy'>
<p>©{date()}</p>
     </div> 
      </footer>    
  </>
  );
}

export default footer