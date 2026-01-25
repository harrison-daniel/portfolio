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
  themeColor: '#f3f4f6',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} min-h-full bg-gray-100 pb-20 text-neutral-900 dark:bg-neutral-950 dark:text-white`}>
        <div className='relative min-h-full'>
          <BackgroundImage />
          <Navbar />
          <main className='pt-[var(--nav-h)]'>{children}</main>
          <Toaster position='top-right' richColors closeButton />
          <Footer />
        </div>
      </body>
    </html>
  );
}
