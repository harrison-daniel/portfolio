'use client';
import dynamic from 'next/dynamic';
import useMediaQuery from '../lib/useMediaQuery';

const MobileNavbar = dynamic(() => import('./MobileNavbar'), { ssr: false });
const DesktopNavbar = dynamic(() => import('./DesktopNavbar'), { ssr: false });

export default function Navbar() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <>
      <div className='sticky top-0 z-40 w-full bg-gray-100 px-[2.5vw] py-1 pt-[env(safe-area-inset-top)] shadow-xl'>
        {isMobile ? <MobileNavbar /> : <DesktopNavbar />}
      </div>
    </>
  );
}
