import Landing from '../components/Landing';
import Work from '../components/Work';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <section id='/'>
        <Landing />
      </section>
      <section id='work'>
        <Work />
      </section>
      <section id='contact'>
        <Contact />
      </section>
    </>
  );
}
