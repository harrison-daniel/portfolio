import Link from 'next/link';
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';
import { BsFillEnvelopeFill, BsFillTelephoneFill } from 'react-icons/bs';
import Work from './components/Work';
import Contact from './components/Contact';

export default function Home() {
  return (
    <>
      <div className='min-h-screen pt-20 p-6 ' id='landing'>
        <div className='flex flex-col sm:flex-row-reverse justify-center  '>
          {/* <div className='flex justify-center items-center w-full sm:w-72  pb-4'> */}
          {/* <Image
            src={headshot}
            alt='blocks'
            className=' rounded-full shadow-xl'
            id='landing-headshot'
          /> */}
          {/* </div> */}

          <div className='  '>
            <div className='bg-slate-50 bg-opacity-75'>
              <h1 className='font-mono fancy flex flex-wrap text-7xl font-bold'>
                Harrison Daniel
              </h1>
              <h2 className='font-mono font-extrabold text-3xl  text-amber-600 '>
                Full Stack Web Developer
              </h2>
            </div>

            {/* <h2 className='word flex justify-center  text-center  sm:justify-start sm:text-left text-2xl font-bold'>
                  Optimizing
                  <br />
                  User Experiences
                </h2> */}
            {/* old animation
                <div className='container'>
                  <p>
                    Coding is <span className='typed-text'></span>
                    <span className='cursor'>&nbsp;</span>
                  </p>
                </div>
              </div> */}

            {/* 3rd animation */}

            <p className=' text-lg sm:max-w-lg sm:text-left ' id='landing-p'>
              Over 5 years of expereince in the Tech industry with an emphasis
              on the MERN stack,(MongoDB, Express.js, React.js, and Node.js).{' '}
              <br />
              <br />
              Having been on all ends of software solutions, I'm knowledgeable
              about working through the entire life cycle of a product & enjoy
              creating and optimizing user experiences.
            </p>
            <div className='flex justify-center sm:justify-start p-4'>
              <Link
                href='#work'
                id=''
                className=' bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded'>
                {/* className=' bg-cyan-900 text-white font-bold py-2 px-4 */}
                My Work
              </Link>
            </div>
            <div className='flex justify-center mx-20 mt-20 mb-8 text-3xl  '>
              <ul className='flex  gap-14'>
                <Link
                  href='https://www.linkedin.com/in/harrisondaniel/'
                  target='_blank'>
                  <li>
                    <AiFillLinkedin />
                  </li>
                </Link>
                <Link href='https://github.com/harrison-daniel' target='_blank'>
                  <li>
                    <AiFillGithub />
                  </li>
                </Link>
                <Link href='mailto:harrisonhjd@gmail.com'>
                  <li className=''>
                    <BsFillEnvelopeFill />
                  </li>
                </Link>
                <Link href='#'>
                  <li>
                    <BsFillTelephoneFill className='' />
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Work />
      <Contact />
    </>
  );
}
