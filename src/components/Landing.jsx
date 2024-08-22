'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

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

export default function Landing() {
  return (
    <>
      <div id='/'>
        <motion.div
          initial='hidden'
          animate='visible'
          variants={landingContainerVariants}
          className='mx-auto flex min-h-screen flex-col items-center rounded-3xl px-6 pt-[14vh]'>
          <div className='flex flex-col gap-2.5 bg-neutral-50'>
            <motion.h1
              variants={landingItemVariants}
              className='fancy font-mono text-5xl font-bold lg:text-7xl'>
              Harrison Daniel
            </motion.h1>
            <motion.h2
              variants={landingItemVariants}
              className='font-mono text-xl font-extrabold text-amber-600 lg:text-3xl'>
              Full Stack Developer
            </motion.h2>
            <motion.p
              variants={landingItemVariants}
              className='text-base sm:max-w-lg'>
              Full Stack Developer with over five years of experience in the
              SaaS industry across multiple verticals. Proven ability to build
              and scale applications leveraging a unique blend of technical
              expertise and customer-centric insights. Adept at delivering and
              optimizing high quality, user-focused solutions.
            </motion.p>
          </div>
          <motion.div
            variants={landingItemVariants}
            className='flex justify-center p-4'>
            <Link
              href='#work'
              className='mt-6 rounded bg-emerald-800 px-4 py-2 font-bold text-white hover:bg-emerald-700'>
              My Work
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
