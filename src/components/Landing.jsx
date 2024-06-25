'use client';

import { motion } from 'framer-motion';
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';
import { BsFillEnvelopeFill, BsFillTelephoneFill } from 'react-icons/bs';
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
          className='flex flex-col items-center pt-28 px-6 min-h-screen mx-auto  rounded-3xl '>
          <div className='bg-neutral-50'>
            <motion.h1
              variants={landingItemVariants}
              className='font-mono fancy text-5xl lg:text-7xl font-bold pb-2'>
              Harrison Daniel
            </motion.h1>
            <motion.h2
              variants={landingItemVariants}
              className='font-mono font-extrabold text-xl lg:text-3xl text-amber-600 pb-2'>
              Full Stack Web Developer
            </motion.h2>
            <motion.p
              variants={landingItemVariants}
              className='text-base sm:max-w-lg'>
              Over 5 years of experience in the SaaS industry across multiple
              verticals from database performance monitoring to Integration
              Platform as a Service. Having been on all ends of software
              solutions, I am knowledgeable about working through the entire
              life cycle of a product in both pre and post sales roles. I bring
              a unique blend of technical expertise and customer-centric
              insights and enjoy creating & optimizing user experiences.
            </motion.p>
          </div>
          <motion.div
            variants={landingItemVariants}
            className='flex justify-center p-4'>
            <Link
              href='#work'
              className='bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-2 px-4 mt-6 rounded'>
              My Work
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
