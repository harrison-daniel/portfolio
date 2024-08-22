'use client';

import React, { useState, useRef } from 'react';
import projects from '../lib/projects';
import ProjectCard from './ProjectCard';
import { motion, useInView } from 'framer-motion';

const ProjectList = () => {
  const [openCardIndex, setOpenCardIndex] = useState(null);

  const handleCardClick = (index) => {
    setOpenCardIndex(index === openCardIndex ? null : index);
  };

  const h2Ref = useRef(null);
  const h2InView = useInView(h2Ref, {
    triggerOnce: true,
    threshold: 0.5,
  });

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className='mx-auto min-h-screen pt-24'>
      <motion.h2
        ref={h2Ref}
        initial='hidden'
        animate={h2InView ? 'visible' : 'hidden'}
        variants={fadeInVariants}
        className='text-center text-4xl font-bold'>
        My Work
      </motion.h2>

      <motion.div className='flex h-auto flex-col content-evenly gap-[60vh] pt-[15vh] md:gap-[30vh]'>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            isOpen={openCardIndex === index}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default ProjectList;
