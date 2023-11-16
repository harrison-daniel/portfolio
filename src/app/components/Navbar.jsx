'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  AiOutlineClose,
  AiOutLineMenu,
  AiFillGithub,
  AiFillLinkedin,
} from 'react-icons/ai';
import { FaCode, FaLinkedinIn } from 'react-icons/fa';
import { CgMenu } from 'react-icons/cg';
import {
  BsFillEnvelopeFill,
  BsFillMoonStarsFill,
  BsFillTelephoneFill,
  BsBadgeHd,
} from 'react-icons/bs';

import logo from '../../../public/assets/images/logo.png';

export default function Navbar(Navigation) {
  const [open, setOpen] = useState(false);

  const handleNav = () => {
    setOpen(!open);
  };

  const currentRoute = usePathname();

  return (
    <div className='fixed w-full p-4 shadow-xl bg-gray-100 z-40'>
      {/* Mobile Navbar */}
      <div
        className={
          open
            ? 'md:hidden fixed right-0 top-0 w-full h-screen bg-black/70'
            : ''
        }>
        <div
          className={
            open
              ? 'fixed right-0 top-0 h-screen bg-white  ease-in duration-300 w-[50%] sm:w-[50%] md:w-[50%] '
              : 'fixed right-[-100%] top-0 ease-in duration-300 '
          }>
          <div>
            <div className='flex w-full items-center justify-between'>
              <Image src={logo} width='80' height='auto' alt='/' />
              <div
                className='rounded-full shadow-lg shadow-slate-500  cursor-pointer absolute right-0 top-0 p-3 m-3 '
                onClick={handleNav}>
                <AiOutlineClose />
              </div>
            </div>
          </div>
          <div className='text-center px-4 font-semibold' onClick={handleNav}>
            <ul className='grid-flow-col text-2xl'>
              <Link href='/'>
                <li className='p-4'>Home</li>
              </Link>
              <Link href='#myWork'>
                <li className='p-4'>My Work</li>
              </Link>
              <Link href='/HarrisonDanielResume.pdf' target='blank'>
                <li className='p-4'>Resume</li>
              </Link>
              <Link href='#contact'>
                <li className='p-4'>Contact</li>
              </Link>
            </ul>
            <div className='flex flex-wrap justify-center pt-20 text-center'>
              <p className='uppercase tracking-widest text-[#5651e5]'>
                Connect with me
              </p>
              <div className='flex justify-between my-4 w-full sm:w-[80%]'>
                <Link
                  href='https://www.linkedin.com/in/harrisondaniel/'
                  target='_blank'
                  className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-400'>
                  <AiFillLinkedin />
                </Link>
                <Link
                  href='https://github.com/harrison-daniel'
                  target='_blank'
                  className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-400'>
                  <AiFillGithub />
                </Link>
                <Link
                  href='mailto:harrisonhjd@gmail.com'
                  className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-400'>
                  <BsFillEnvelopeFill />
                </Link>
                <Link
                  href=''
                  className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-400'>
                  <BsFillTelephoneFill />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navbar */}

      <div className='flex items-center justify-between h-full w-full px-2 2xl:px-16'>
        <Link href='/'>
          <div className='font-mono font-semibold text-lg pl-2'>
            Harrison Daniel
          </div>
        </Link>
        <div>
          <div>
            <ul className='hidden md:flex'>
              <Link
                href='#'
                className={
                  currentRoute === '#' ? 'active-nav' : 'non-active-nav'
                }>
                <li className='ml-10 text-base font-semibold uppercase hover:text-emerald-700 hover:border-b hover:border-b-emerald-700 '>
                  Home
                </li>
              </Link>

              <Link
                href='#work'
                className={
                  currentRoute === '#work' ? 'active-nav' : 'non-active-nav'
                }>
                <li className='ml-10 text-base font-semibold uppercase hover:text-emerald-700 hover:border-b hover:border-b-emerald-700'>
                  My Work
                </li>
              </Link>
              <Link href='/HarrisonDanielResume.pdf' target='_blank'>
                <li className='ml-10 text-base font-semibold uppercase hover:text-emerald-700 hover:border-b hover:border-b-emerald-700'>
                  Resume
                </li>
              </Link>
              <Link
                href='#contact'
                className={
                  currentRoute === '#contact' ? 'active-nav' : 'non-active-nav'
                }>
                <li className='ml-10 text-base font-semibold uppercase hover:text-emerald-700 hover:border-b hover:border-b-emerald-700'>
                  Contact
                </li>
              </Link>
            </ul>
            <div className='md:hidden' onClick={handleNav}>
              <CgMenu className='text-2xl' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
