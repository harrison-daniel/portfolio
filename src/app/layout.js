import './globals.css';
import { Poppins } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import BackgroundImage from '../components/BackgroundImage';

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
        <BackgroundImage />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
