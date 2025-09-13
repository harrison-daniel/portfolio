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
      className='flex flex-col justify-center'>
      <h2 className='pb-12 text-center text-3xl font-bold md:text-4xl'>
        About Me
      </h2>

      <motion.p
        variants={fadeUp}
        className='mx-auto flex max-w-3xl justify-center text-center text-neutral-800'>
        Full-stack developer with 5+ years in the SaaS industry across multiple
        verticals. My approach is to bridge the technical depth with customer
        perspective, so that the applications I build are intuitive and
        functional.
      </motion.p>

      <div className='mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3'>
        {['Web Design', 'Web Development', 'Drone Photography'].map((t) => (
          <motion.div
            key={t}
            variants={fadeUp}
            className='rounded-xl border border-neutral-200 bg-white p-4 text-center shadow-sm'>
            <p className='font-medium'>{t}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
