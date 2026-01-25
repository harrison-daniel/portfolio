'use client';

import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

export default function Navbar() {
  return (
    <>
      <header className='fixed left-0 top-0 z-50 hidden w-full bg-gray-100/90 px-[2.5vw] py-1 pt-[env(safe-area-inset-top)] shadow-xl backdrop-blur md:block'>
        <DesktopNavbar />
      </header>
      <div className='md:hidden'>
        <MobileNavbar />
      </div>
    </>
  );
}
