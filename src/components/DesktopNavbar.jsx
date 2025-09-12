'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HdLogo1 from '../../public/assets/images/hd-logo-1.png';
import { BiDownload } from 'react-icons/bi';

export default function DesktopNavbar() {
  const [activeSection, setActiveSection] = useState('/');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let foundSection = '';
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          foundSection = section.id;
        }
      });
      if (!foundSection) {
        setActiveSection('/');
      } else {
        setActiveSection(foundSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='flex h-12 w-full items-center justify-between'>
      <Link href='/' className=''>
        <Image src={HdLogo1} className='w-11' alt='Harrison Daniel Logo' />
      </Link>
      <div>
        <ul className='hidden items-center md:flex'>
          <li
            className={`ml-10 text-base font-semibold uppercase hover:text-emerald-950 ${
              activeSection === 'home'
                ? 'border-b border-b-emerald-950 text-emerald-950'
                : ''
            }`}>
            <Link href='/#home'>Home</Link>
          </li>

          <li
            className={`ml-10 text-base font-semibold uppercase hover:text-emerald-950 ${
              activeSection === 'about'
                ? 'border-b border-b-emerald-950 text-emerald-950'
                : ''
            }`}>
            <Link href='/#about'>About</Link>
          </li>

          <li
            className={`ml-10 text-base font-semibold uppercase hover:text-emerald-950 ${
              activeSection === 'work'
                ? 'border-b border-b-emerald-950 text-emerald-950'
                : ''
            }`}>
            <Link href='/#work'>My Work</Link>
          </li>

          <li
            className={`ml-10 text-base font-semibold uppercase hover:text-emerald-950 ${
              activeSection === 'contact'
                ? 'border-b border-b-emerald-950 text-emerald-950'
                : ''
            }`}>
            <Link href='/#contact'>Contact</Link>
          </li>
          <li className='ml-10 text-base font-semibold uppercase'>
            <Link
              href='/HarrisonDanielResume.pdf'
              target='_blank'
              className='flex flex-row items-center gap-2 rounded-md border border-black px-2 py-1 text-lg font-bold text-neutral-900'>
              <BiDownload />
              Resume
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
