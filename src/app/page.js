import Home from '../components/Home';
import About from '../components/About';
import Work from '../components/Work';
import ContactFormWrapper from '../components/ContactForm';
import AboutTabs from '../components/AboutTabs';

export default function Page() {
  return (
    <div>
      <section id='home' className='relative pt-[var(--nav-h)]'>
        <div className='mx-auto w-full max-w-5xl px-4 pb-40 pt-8 md:pb-52 md:pt-12'>
          <Home />
        </div>
      </section>

      <section id='about' className='relative my-40 py-20 md:py-36'>
        <div className='pointer-events-none absolute inset-0 -z-10 bg-gray-100/85' />
        <div className='mx-auto max-w-5xl px-4'>
          <About />
          <AboutTabs />
        </div>
      </section>

      <section id='work' className='relative py-28 md:py-36'>
        <div className='pointer-events-none absolute inset-0 -z-10 bg-gray-100/85' />
        <div className='mx-auto max-w-5xl px-4'>
          <div className='min-h-[1800px] md:min-h-[2200px]'>
            <Work />
          </div>
        </div>
      </section>

      <section id='contact' className='py-28 md:py-36'>
        <div className='mx-auto max-w-5xl px-4'>
          <ContactFormWrapper />
        </div>
      </section>
    </div>
  );
}
