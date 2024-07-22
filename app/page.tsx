import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <>
    <h2 >Présentation du club</h2>
      <nav className='navhome'>
        <div className='div__link'>
          <Link  className='link__navhome' href={'/'}>
            Notre histoire
          </Link>
          <Link  className='link__navhome' href={'../activites.jsx'}>
            Nos activités
          </Link>
          <Link  className='link__navhome' href={'../localisation.jsx'}>
            Localisation
          </Link>
        </div>
      </nav>
      <section className='histoire'>
        <article className='histoire__art'>
          <div className='histoire__art__div'>
            <p className='histoire__art__div__p'>
              Sed auctor pulvinar velit eget tempor. Donec sed euismod augue. Mauris magna ex, congue a nibh eget, laoreet vestibulum ipsum. Nam id efficitur nisl. Etiam vel libero volutpat, imperdiet ante ut, fringilla purus. Curabitur et libero a elit tristique mollis ac in orci. Suspendisse mollis auctor lacinia. Integer vel laoreet massa, ut suscipit turpis. Vivamus sit amet faucibus velit. Ut imperdiet tristique lectus, eu blandit mi semper id. Pellentesque nec eros ullamcorper, lacinia lectus eu, maximus ante. Nullam ac risus varius nunc luctus sodales sit amet in ipsum. Morbi eget lectus velit. Nulla et bibendum ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce luctus, nisl a efficitur molestie, mi nunc porta tellus, vel sollicitudin sem purus non metus. Nam tristique neque at urna ultricies blandit. Curabitur sit amet felis nec metus imperdiet posuere. Ut turpis ipsum, auctor at augue posuere, faucibus aliquet massa. Ut tincidunt neque at nulla congue convallis. Curabitur eget dolor vel lorem iaculis ullamcorper sit amet eu lacus. Nulla nisi quam, posuere eget sodales iaculis, pulvinar at neque. Curabitur lobortis vestibulum condimentum. Vivamus pharetra porttitor tortor, ut fermentum massa mattis a. Proin mauris est, egestas nec urna quis, tincidunt sodales est. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam vulputate erat aliquam, gravida tortor ac, pulvinar tortor. Maecenas id placerat lorem, eu laoreet tellus. Maecenas magna ex, varius ac dolor a, aliquam tempus nunc. Mauris finibus, sem ut ornare semper, nisi mauris ultrices leo, quis gravida enim nisl ut ipsum. Morbi posuere nunc dui, accumsan vulputate leo ultrices at. Donec malesuada lacus ac diam elementum sagittis. Duis a feugiat lacus.
            </p>
          </div>
          <div className='histoire__art__img'>
             <Image
              className='img__histoire'
              src="/images/article.webp"
              width={500}
              height={500}
              alt="Article de journal"
            /> 
          </div>
        </article>
      </section>
      <section className='evt'>
        <h2 className='evt__p'>
          Prochains Evénements
        </h2>
     
      </section>
    </>
  );
}
