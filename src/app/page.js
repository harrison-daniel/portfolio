import Home from '../components/Home';
import About from '../components/About';
import Work from '../components/Work';
import ContactFormWrapper from '../components/ContactForm';

export default function Page() {
  return (
    <>
      <section id='home'>
        <Home />
      </section>
      <section id='about'>
        <About />
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
