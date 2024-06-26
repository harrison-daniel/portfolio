// ProjectModal.jsx
'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

const contentVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <motion.div
        className='fixed inset-0 bg-black bg-opacity-70'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />
      <motion.div
        className='flex flex-col gap-[5vh] bg-white rounded-lg p-4 md:p-8 mx-auto relative z-20 h-[63vh] w-[90vw] md:h-[50vh] md:w-[30vw]'
        variants={modalVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
        transition={{ duration: 0.4 }}>
        <div className='flex flex-row justify-center'>
          <h2 className='text-2xl font-bold flex justify-center'>
            {project.title}
          </h2>
        </div>

        <div className='absolute right-[3vw] top-[2.5vh]'>
          <button onClick={onClose} className='flex  align-bottom justi'>
            <AiOutlineClose className='text-2xl' />
          </button>
        </div>

        <div className='flex flex-row gap-4 md:gap-[4vw] pt-6  '>
          <motion.div
            variants={contentVariants}
            initial='hidden'
            animate='visible'
            transition={{ duration: 0.5, delay: 0.2 }}
            // initial={{ scale: 1.4 }}
            // animate={{ scale: 1 }}
            // transition={{ duration: 0.4 }}
            className='grow-0 shrink-0 '>
            <Image
              src={project.image}
              alt={project.alt}
              className='rounded-lg w-28 md:w-48 bg-black md:col-span-2 shrink-0 grow-0 '
            />
          </motion.div>

          <motion.div
            className='text-sm '
            variants={contentVariants}
            initial='hidden'
            animate='visible'
            transition={{ duration: 0.5, delay: 0.2 }}>
            <p className='text-gray-700  '>{project.descriptionModal}</p>
          </motion.div>
        </div>

        <div className=''>
          <div className='flex flex-wrap items-center justify-start'>
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className=' bg-gray-200 rounded-md px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2'>
                {tag}
              </span>
            ))}
          </div>

          {/* <motion.div
            className='text-sm '
            initial={{ scale: 1.4 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}> */}
          <div className='flex justify-center pt-12 '>
            <Link
              href={project.link}
              target='_blank'
              rel='noopener noreferrer'
              className='bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-1.5 px-3 rounded'>
              Live Site
            </Link>
          </div>
          {/* </motion.div> */}
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectModal;
