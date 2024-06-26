'use client';
import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import HdLogo1 from '../../public/assets/images/hd-logo-1.png';
import { BiDownload } from 'react-icons/bi';

export default function DesktopNavbar() {
  // const router = useRouter();
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
    handleScroll(); // Set the initial section on load
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='flex items-center justify-between h-12 w-full   '>
      <Link href='/' className=''>
        <Image src={HdLogo1} className='w-11 ' alt='Harrison Daniel Logo' />
      </Link>
      <div>
        <ul className='hidden md:flex items-center'>
          <li
            className={`ml-10 text-base font-semibold uppercase hover:text-emerald-700  ${
              activeSection === '/'
                ? 'text-emerald-700 border-b border-b-emerald-700'
                : ''
            }`}>
            <Link href='/'>Home</Link>
          </li>

          <li
            className={`ml-10 text-base font-semibold uppercase hover:text-emerald-700  ${
              activeSection === 'work'
                ? 'text-emerald-700 border-b border-b-emerald-700'
                : ''
            }`}>
            <Link href='/#work'>My Work</Link>
          </li>

          <li
            className={`ml-10 text-base font-semibold uppercase hover:text-emerald-700  ${
              activeSection === 'contact'
                ? 'text-emerald-700 border-b border-b-emerald-700'
                : ''
            }`}>
            <Link href='/#contact'>Contact</Link>
          </li>
          <li className='ml-10 text-base font-semibold uppercase  '>
            <Link
              href='/HarrisonDanielResume.pdf'
              target='_blank'
              className='flex flex-row gap-2 items-center bg-amber-600 rounded-md py-1 px-2 text-neutral-900 '>
              <BiDownload />
              Resume
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
