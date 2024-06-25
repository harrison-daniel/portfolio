'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import ProjectModal from './ProjectModal';
import gitpub from '../../public/assets/images/yesmore-content-beer.jpg';
import PicknFlickLogo3 from '../../public/assets/images/PicknFlick-logo-3.png';
import PasswordGenerator from '../../public/assets/images/password-generator.png';

const projects = [
  {
    image: gitpub,
    alt: 'picture of full beer mug with foam on top',
    title: 'GitPub',
    description:
      'Search for breweries in your area and add custom entries or notes to your profile.',
    descriptionModal:
      'this is the desc for when the modal pops up. share additional info here about building the project',
    link: 'https://gitpub.vercel.app',
    tags: [
      'Next.js',
      'React.js',
      'MongoDB',
      'Tailwind CSS',
      'shadcn-ui',
      'Auth.js',
      'Vercel',
      'Open Brewery DB',
    ],
  },
  {
    image: PicknFlickLogo3,
    alt: 'PicknFlick logo',
    title: 'PicknFlick',
    description: 'Random Decision Maker.. with a twist!',
    descriptionModal:
      'this is the desc for when the modal pops up. share additional info here about building the project',
    link: 'https://picknflick.com',
    tags: [
      'Next.js',
      'React.js',
      'Framer Motion',
      'AWS',
      'EC2',
      'Nginx',
      'Docker',
      'Docker Compose',
    ],
  },
  {
    image: PasswordGenerator,
    alt: 'picture of a password generator',
    title: 'Password Generator',
    description: 'Custom, unique password generator',
    descriptionModal:
      'this is the desc for when the modal pops up. share additional info here about building the project',
    link: 'https://harrison-daniel.github.io/password-generator/',
    tags: ['Javascript', 'HTML', 'CSS'],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className=' pt-[10vh] lg:pt-[9vh] '>
      <div
        className='w-full  flex flex-col gap-6  min-h-screen py-6 px-[2vw]  bg-zinc-50  items-center'
        id='work'>
        <div className='w-auto mx-auto'>
          <motion.div
            className='flex justify-center text-amber-600 '
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.5 }}
            variants={cardVariants}>
            <h2 className=' font-mono text-3xl font-extrabold  '>My Work</h2>
          </motion.div>
        </div>

        <div className=' flex flex-col gap-[30vh]'>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className='flex justify-center bg-slate-50 p-6 mx-auto shadow-xl hover:cursor-pointer h-auto max-h-fit rounded-md'
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
              onClick={() => handleOpenModal(project)}>
              <div className='max-w-sm rounded shadow-lg'>
                {project.image && (
                  <div className='m-2 flex justify-center bg-black'>
                    <Image src={project.image} alt={project.alt} />
                  </div>
                )}
                <div className='px-6 py-4'>
                  <div className='font-bold text-xl mb-2'>{project.title}</div>
                  <p className='text-gray-700 text-base'>
                    {project.description}
                  </p>
                  <div className='pt-6 flex justify-center gap-6'>
                    <Link
                      href={project.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded'>
                      Live Site
                    </Link>
                    <button
                      className='bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal(project);
                      }}>
                      About
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          <AnimatePresence>
            {selectedProject && (
              <ProjectModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={handleCloseModal}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Work;
