import Landing from '../components/Landing';
import Work from '../components/Work';
import ContactFormWrapper from '../components/ContactForm';

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
        <ContactFormWrapper />
      </section>
    </>
  );
}
