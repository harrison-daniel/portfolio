'use client';

import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
  return (
    <motion.div
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.3 }}
      className='mx-auto flex max-w-4xl flex-col items-center justify-center px-6 text-center'>
      <h2 className='flex flex-col justify-center text-3xl font-bold md:text-4xl'>
        About Me
      </h2>

      <motion.p
        variants={fadeUp}
        className='mx-auto flex max-w-3xl flex-col justify-center text-center text-neutral-800'>
        Full-stack developer with 5+ years in the SaaS industry across multiple
        verticals. My approach is to bridge the technical depth with customer
        perspective, so that the applications I build are intuitive and
        functional.
      </motion.p>
    </motion.div>
  );
}
