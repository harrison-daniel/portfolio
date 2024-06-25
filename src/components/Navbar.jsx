'use client';
import dynamic from 'next/dynamic';
import useMediaQuery from '../lib/useMediaQuery';

const MobileNavbar = dynamic(() => import('./MobileNavbar'), { ssr: false });
const DesktopNavbar = dynamic(() => import('./DesktopNavbar'), { ssr: false });

export default function Navbar() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <>
      <div className='fixed w-full shadow-xl bg-gray-100 z-40  px-[2.5vw] py-1 '>
        {isMobile ? <MobileNavbar /> : <DesktopNavbar />}
      </div>
    </>
  );
}
