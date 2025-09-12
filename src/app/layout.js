import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackgroundImage from '../components/BackgroundImage';
import { Toaster } from '../components/ui/sonner';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Harrison Daniel',
  description: 'Full-stack developer portfolio',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className=''>
      <body className={inter.className}>
        <BackgroundImage />
        <Navbar />
        <main>{children}</main>
        <Toaster position='top-right' richColors closeButton />
        <Footer />
      </body>
    </html>
  );
}
