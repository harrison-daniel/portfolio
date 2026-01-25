'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { BsFillEnvelopeFill, BsFillTelephoneFill } from 'react-icons/bs';
import HdLogo1 from '../../public/assets/images/hd-logo-1.png';
import { BiDownload } from 'react-icons/bi';
import useActiveSection from '../lib/useActiveSection';

const MOBILE_NAV_ITEMS = [
  { id: 0, navTitle: 'Home', href: '/#home', activeSection: 'home' },
  { id: 1, navTitle: 'About', href: '/#about', activeSection: 'about' },
  { id: 2, navTitle: 'My Work', href: '/#work', activeSection: 'work' },
  { id: 3, navTitle: 'Contact', href: '/#contact', activeSection: 'contact' },
  { id: 4, navTitle: '', href: '/HarrisonDanielResume.pdf', newTab: true },
];

export default function MobileNavbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const activeSection = useActiveSection(['home', 'about', 'work', 'contact'], {
    navOffset: 110,
  });

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', mobileNavOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [mobileNavOpen]);

  const mobileMenuVariant = {
    opened: {
      y: '0%',
      transition: { delay: 0.05, duration: 0.6, ease: [0.74, 0, 0.19, 1.02] },
    },
    closed: {
      y: '-100%',
      transition: { delay: 0.2, duration: 0.4, ease: [0.74, 0, 0.19, 1.02] },
    },
  };

  const fadeInVariant = {
    opened: { opacity: 1, transition: { delay: 0.7, duration: 0.4 } },
    closed: { opacity: 0, transition: { duration: 0.4 } },
  };

  const ulVariant = {
    opened: { transition: { delayChildren: 0.6, staggerChildren: 0.1 } },
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  };

  const liVariant = {
    opened: {
      opacity: 1,
      y: '0%',
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    closed: {
      opacity: 0,
      y: '100%',
      transition: { duration: 0.2, ease: 'easeInOut' },
    },
  };

  const container = { size: 26 };
  const lines = { size: 4 };

  const animations = {
    container: {
      initial: { opacity: 1 },
      animate: { opacity: 1, transition: { duration: 0.5 } },
    },
    lines: [
      {
        initial: { y: 0, opacity: 1 },
        opened: {
          y: (container.size - lines.size) / 2,
          opacity: 1,
          transition: { y: { duration: 0.5, ease: 'easeInOut' } },
        },
        closed: {
          y: 0,
          opacity: 1,
          transition: { y: { duration: 0.5, ease: 'easeInOut' } },
        },
      },
      {
        initial: {
          y: (container.size - lines.size) / 2,
          height: lines.size,
          opacity: 1,
        },
        opened: {
          height: 0,
          opacity: 0,
          transition: {
            height: { duration: 0.5, ease: 'easeInOut' },
            opacity: { duration: 0.5 },
          },
        },
        closed: {
          height: lines.size,
          opacity: 1,
          transition: {
            height: { duration: 0.5, ease: 'easeInOut' },
            opacity: { duration: 0.5, delay: 0.2 },
          },
        },
      },
      {
        initial: { y: container.size - lines.size, opacity: 1 },
        opened: {
          y: (container.size - lines.size) / 2,
          opacity: 1,
          transition: { y: { duration: 0.5, ease: 'easeInOut' } },
        },
        closed: {
          y: container.size - lines.size,
          opacity: 1,
          transition: { y: { duration: 0.5, ease: 'easeInOut' } },
        },
      },
    ],
  };

  return (
    <motion.nav initial='closed' animate={mobileNavOpen ? 'opened' : 'closed'}>
      <div className='fixed left-0 top-0 z-[10000] w-full bg-gray-100 px-4 py-2 pt-[env(safe-area-inset-top)] shadow-xl'>
        <div className='flex items-center justify-between'>
          <Link href='/#home' onClick={() => setMobileNavOpen(false)}>
            <Image src={HdLogo1} className='w-11' alt='Harrison Daniel Logo' />
          </Link>

          <button
            type='button'
            aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen((v) => !v)}
            className='grid h-11 w-11 place-items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-black/30'>
            <motion.div
              style={{ width: container.size, height: container.size }}
              variants={animations.container}
              animate='animate'
              className='relative'>
              {animations.lines.map((_, index) => (
                <motion.span
                  key={index}
                  className='line absolute left-0 bg-emerald-950'
                  style={{ height: lines.size }}
                  variants={animations.lines[index]}
                  initial='initial'
                  animate={mobileNavOpen ? 'opened' : 'closed'}
                />
              ))}
            </motion.div>
          </button>
        </div>
      </div>

      <motion.div
        variants={mobileMenuVariant}
        style={{ pointerEvents: mobileNavOpen ? 'auto' : 'none' }}
        className='fixed inset-0 z-[9999] flex h-full w-full flex-col bg-gray-100 pt-[calc(env(safe-area-inset-top)+56px)]'>
        {/* click-off layer */}
        <button
          type='button'
          aria-label='Close menu'
          onClick={() => setMobileNavOpen(false)}
          className='absolute inset-0'
        />

        <div className='relative z-10'>
          <motion.ul
            variants={ulVariant}
            className='flex flex-col items-center gap-9 pt-10 text-2xl font-bold text-black'>
            {MOBILE_NAV_ITEMS.map((navItem) => (
              <motion.li
                whileTap={{ scale: 0.95 }}
                key={navItem.id}
                onClick={() => setMobileNavOpen(false)}>
                <motion.div variants={liVariant}>
                  {navItem.newTab ? (
                    <Link
                      href='/HarrisonDanielResume.pdf'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex flex-row items-center gap-2 rounded-md border border-black px-2 py-1 text-lg font-bold text-neutral-900'>
                      <BiDownload />
                      Resume
                    </Link>
                  ) : (
                    <Link
                      href={navItem.href}
                      className={[
                        'font-semibold uppercase',
                        activeSection === navItem.activeSection
                          ? 'text-emerald-700'
                          : '',
                      ].join(' ')}>
                      {navItem.navTitle}
                    </Link>
                  )}
                </motion.div>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={fadeInVariant}>
            <div className='mx-20 mb-8 mt-20 flex justify-center text-3xl'>
              <ul className='flex gap-14'>
                <li>
                  <Link
                    href='https://www.linkedin.com/in/harrisondaniel/'
                    target='_blank'
                    rel='noopener noreferrer'>
                    <AiFillLinkedin />
                  </Link>
                </li>
                <li>
                  <Link
                    href='https://github.com/harrison-daniel'
                    target='_blank'
                    rel='noopener noreferrer'>
                    <AiFillGithub />
                  </Link>
                </li>
                <li>
                  <Link href='mailto:harrisonhjd@gmail.com'>
                    <BsFillEnvelopeFill />
                  </Link>
                </li>
                <li>
                  <Link href='tel:+8045199827'>
                    <BsFillTelephoneFill />
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
