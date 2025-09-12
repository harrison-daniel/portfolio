'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';
import { BsFillEnvelopeFill, BsFillTelephoneFill } from 'react-icons/bs';

const landingContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
};

const landingItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Home() {
  return (
    <div id='/#home' className='flex items-center justify-center px-4'>
      <motion.div
        initial='hidden'
        animate='visible'
        variants={landingContainerVariants}
        className='mx-auto flex max-w-4xl flex-col justify-center rounded-3xl px-6 py-20 text-center'>
        <div className='mx-auto inline-block'>
          <motion.h1
            variants={landingItemVariants}
            className='font-heading text-foreground text-5xl font-bold tracking-tight md:text-7xl'>
            Harrison Daniel
          </motion.h1>
          <motion.span
            variants={landingItemVariants}
            className='mx-auto my-4 block h-0.5 w-[84%] bg-black'
          />

          <motion.h2
            variants={landingItemVariants}
            className='text-muted-foreground my-4 text-2xl font-semibold md:text-3xl'>
            Full Stack Developer
          </motion.h2>
          <motion.h3
            variants={landingItemVariants}
            className='text-muted-foreground my-4 text-lg text-slate-800 md:text-xl'>
            Building approachable <br /> and reliable web apps
          </motion.h3>

          <motion.div
            variants={landingItemVariants}
            className='flex justify-center py-4'>
            <div className='flex justify-center text-3xl'>
              <ul className='flex gap-14'>
                <Link
                  href='https://www.linkedin.com/in/harrisondaniel/'
                  target='_blank'
                  className='transition-transform duration-200 hover:scale-110'
                  aria-label='LinkedIn Profile'>
                  <AiFillLinkedin />
                </Link>
                <Link
                  href='https://github.com/harrison-daniel'
                  target='_blank'
                  className='transition-transform duration-200 hover:scale-110'
                  aria-label='GitHub Profile'>
                  <AiFillGithub />
                </Link>
                <Link
                  href='mailto:harrisonhjd@gmail.com'
                  className='transition-transform duration-200 hover:scale-110'
                  aria-label='Send Email'>
                  <BsFillEnvelopeFill />
                </Link>
                <Link
                  href='tel:+8045199827'
                  className='transition-transform duration-200 hover:scale-110'
                  aria-label='Call Phone'>
                  <BsFillTelephoneFill />
                </Link>
              </ul>
            </div>
          </motion.div>
        </div>
        <motion.div
          variants={landingItemVariants}
          className='mt-2 flex flex-col items-center gap-4 sm:flex-row sm:justify-center'>
          <Link
            href='#about'
            className='group inline-flex items-center gap-2 rounded-md px-3 py-2 font-semibold leading-none text-black outline-none ring-1 ring-transparent transition-all duration-200 hover:bg-black/5 hover:text-black/90 focus-visible:ring-2 focus-visible:ring-black/30'>
            <span className='align-middle'>About Me</span>
            <ExternalLink
              aria-hidden='true'
              className='h-4 w-4 shrink-0 align-middle transition-transform group-hover:translate-x-1'
            />
          </Link>

          <Link
            href='#work'
            className='group inline-flex items-center gap-2 rounded-md px-3 py-2 font-semibold leading-none text-black outline-none ring-1 ring-transparent transition-all duration-200 hover:bg-black/5 hover:text-black/90 focus-visible:ring-2 focus-visible:ring-black/30'>
            <span className='align-middle'>My Work</span>
            <ExternalLink
              aria-hidden='true'
              className='h-4 w-4 shrink-0 align-middle transition-transform group-hover:translate-x-1'
            />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
