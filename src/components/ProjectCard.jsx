'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ScrollArea } from './ui/scroll-area';

const ProjectCard = ({ project, isOpen, onClick }) => {
  const ref = useRef(null);
  const inView = useInView(ref, {
    triggerOnce: true,
    threshold: 0.5,
  });

  const workItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    };
    handleScroll();
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <motion.div
      ref={ref}
      variants={workItemVariants}
      initial='hidden'
      animate={inView ? 'visible' : 'hidden'}
      className='m-auto flex h-[20rem] w-[90vw] flex-col items-center justify-center md:w-[40vw]'>
      <motion.div
        layout
        onClick={onClick}
        className={`flex cursor-pointer justify-center gap-1 rounded-lg bg-stone-100 ${
          isOpen
            ? 'fixed inset-0 z-50 m-auto flex h-[80vh] w-[100vw] flex-col p-8 md:h-[50vh] md:w-[40rem]'
            : 'flex flex-col items-center justify-center gap-11 p-6'
        }`}
        transition={{ layout: { duration: 0.4, ease: 'easeOut' } }}>
        <CardTitle title={project.title} isOpen={isOpen} />

        <AnimatePresence layout='position'>
          {!isOpen && (
            <>
              <ClosedCardContent project={project} />
            </>
          )}

          {isOpen && (
            <>
              <OpenedCardContent project={project} />
              <div className='flex justify-center'>
                <Link
                  href={project.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='mx-auto rounded bg-emerald-800 px-4 py-2 font-bold text-white hover:bg-emerald-700'>
                  Live Site
                </Link>
              </div>
            </>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='fixed inset-0 z-40 bg-black bg-opacity-50'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClick}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const CardTitle = ({ title, isOpen }) => (
  <motion.h2
    layout
    transition={{ layout: { duration: 0.4, ease: 'easeOut' } }}
    className={`text-center text-2xl font-bold ${
      isOpen ? 'text-2xl md:text-4xl' : 'text-2xl md:text-2xl'
    }`}>
    {title}
  </motion.h2>
);

const ClosedCardContent = ({ project }) => (
  <motion.div
    transition={{ duration: 0.4, ease: 'easeOut' }}
    className='mx-auto flex w-full flex-col items-center justify-center gap-6 align-middle'>
    <div className='relative h-[250px] w-[300px]'>
      <Image
        src={project.image}
        alt={project.alt}
        layout='fill'
        objectFit='cover'
        className='rounded-lg'
      />
    </div>
  </motion.div>
);

const OpenedCardContent = ({ project }) => (
  <motion.div
    className='flex h-full flex-col overflow-y-auto rounded-lg bg-white p-4 shadow-lg'
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}>
    <ScrollArea>
      <div className='relative mx-auto h-[200px] w-[200px]'>
        <Image
          src={project.image}
          alt={project.alt}
          layout='fill'
          objectFit='cover'
          className='rounded-lg'
        />
      </div>

      <div className='mt-4 text-gray-700'>
        {project.descriptionExpanded.map((item, index) => (
          <p key={index} className='pb-3'>
            <strong>{item.label}</strong> {item.text}
          </p>
        ))}
      </div>
      <div className='mt-4 flex flex-wrap items-center justify-start'>
        {project.tags.map((tag, index) => (
          <span
            key={index}
            className='mb-2 mr-2 rounded-md bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700 md:text-sm'>
            {tag}
          </span>
        ))}
      </div>
    </ScrollArea>
  </motion.div>
);

export default ProjectCard;
