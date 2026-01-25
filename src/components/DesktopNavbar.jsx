'use client';

import Link from 'next/link';
import Image from 'next/image';
import HdLogo1 from '../../public/assets/images/hd-logo-1.png';
import { BiDownload } from 'react-icons/bi';
import useActiveSection from '../lib/useActiveSection';

export default function DesktopNavbar() {
  const activeSection = useActiveSection(['home', 'about', 'work', 'contact'], {
    navOffset: 110,
  });

  const itemClass = (id) =>
    [
      'ml-10 text-base font-semibold uppercase transition-colors hover:text-emerald-950',
      activeSection === id
        ? 'border-b border-b-emerald-950 text-emerald-950'
        : '',
    ].join(' ');

  return (
    <div className='flex h-12 w-full items-center justify-between'>
      <Link href='/#home' aria-label='Home'>
        <Image src={HdLogo1} className='w-11' alt='Harrison Daniel Logo' />
      </Link>

      <ul className='hidden items-center md:flex'>
        <li className={itemClass('home')}>
          <Link href='/#home'>Home</Link>
        </li>
        <li className={itemClass('about')}>
          <Link href='/#about'>About</Link>
        </li>
        <li className={itemClass('work')}>
          <Link href='/#work'>My Work</Link>
        </li>
        <li className={itemClass('contact')}>
          <Link href='/#contact'>Contact</Link>
        </li>

        <li className='ml-10 text-base font-semibold uppercase'>
          <Link
            href='/HarrisonDanielResume.pdf'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 rounded-md border border-black px-2 py-1 text-lg font-bold text-neutral-900'>
            <BiDownload />
            Resume
          </Link>
        </li>
      </ul>
    </div>
  );
}
