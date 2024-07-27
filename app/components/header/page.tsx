import Image from "next/image"; import Link from 'next/link'

function header() {
  return (
    <>
      <header className="header">
        <section className="header__logo">
        <Link className='link__logo' href={'/'}>
          <Image
          className='img__header'
            src="/images/logo.png"
            width={180}
            height={180}
            alt="logo des archers sans limites"/>
          </Link>
    
    </section>

    <nav className='navbar'>
      <div className='div__link'>
    <Link  className='link__navbar' href={'/'}>Présentation du club</Link>
    <Link  className='link__navbar' href={'../evenement.js'}>Evènements</Link>
    <Link   className='link__navbar' href={'../adhesion.js'}>Adhésion</Link>
    <Link  className='link__navbar' href={'../sponsor.js'}>Sponsor</Link>
    
    </div>
    </nav> 
    </header>
    <br />
  </>
  )
}

export default header