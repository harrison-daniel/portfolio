import './globals.css';
import Image from 'next/image';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import circuit from '../../public/assets/images/circuit.jpeg';
import { Poppins } from 'next/font/google';
// import { Inter } from 'next/font/google'

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Harrison Daniel',
  description: 'Harrison Daniel Portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <Navbar />
        <Image
          src={circuit}
          alt='blocks'
          className='absolute opacity-20 -z-10 w-10/12 md:w-7/12  right-0'
          priority
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
