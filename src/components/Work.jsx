'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Timeline } from './ui/Timeline';
import PicknFlickHome from '../../public/assets/images/picknflick-home.png';
import PicknFlickOptions from '../../public/assets/images/picknflick-options.png';
import PicknFlickWelcome from '../../public/assets/images/picknflick-welcome.png';
import PicknFlickWinner from '../../public/assets/images/picknflick-winner.png';
import GitpubDark from '../../public/assets/images/gitpub-dark.png';
import GitpubLight from '../../public/assets/images/gitpub-light.png';
import GitpubSearch from '../../public/assets/images/gitpub-search.png';
import GitpubSignIn from '../../public/assets/images/gitpub-sign-in.png';
import PasswordGeneratorHome from '../../public/assets/images/password-generator-home.png';
import PasswordGeneratorPrompt1 from '../../public/assets/images/password-generator-prompt-1.png';
import PasswordGeneratorPrompt2 from '../../public/assets/images/password-generator-prompt-2.png';
import PasswordGeneratorResult from '../../public/assets/images/password-generator-result.png';

const Tag = ({ tag }) => (
  <span className='mb-2 mr-2 rounded-md bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700 md:text-sm'>
    {tag}
  </span>
);

// The modal-like expanded image functionality
const ImageModal = ({ imageSrc, onClose }) => (
  <AnimatePresence>
    {imageSrc && (
      <>
        {/* Overlay */}
        <motion.div
          className='fixed inset-0 z-40 bg-black bg-opacity-50'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        {/* Expanded Image */}
        <motion.div
          className='fixed inset-0 z-50 flex items-center justify-center'
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}>
          <Image
            src={imageSrc}
            alt='Expanded Image'
            width={800}
            height={500}
            className='rounded-lg object-contain'
          />
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

export default function NewWork() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const data = [
    {
      title: 'Pick n Flick',
      content: (
        <div>
          <p className='mb-6 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
            Random decision maker allowing users to choose between 2 to 6
            options, with spin momentum based on flick speed.
          </p>
          <p className='mb-6 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
            <span className='font-bold'>Front-end: </span> The front-end is
            built with Next.js and React.js, featuring animations with Framer
            Motion, and styled with Tailwind CSS and Shadcn UI.
          </p>
          <p className='mb-6 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
            <span className='font-bold'>Back-end: </span> The app is hosted on
            an AWS EC2 instance (Ubuntu), using an Elastic IP with Nginx as a
            reverse proxy. It is secured with/served over HTTPS using a
            self-signed certificate, with Cron jobs for SSL certificate renewal.
          </p>

          <div className='mb-6 grid grid-cols-2 gap-4'>
            {[
              PicknFlickHome,
              PicknFlickOptions,
              PicknFlickWelcome,
              PicknFlickWinner,
            ].map((imageSrc, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleImageClick(imageSrc)}>
                <Image
                  src={imageSrc}
                  alt={`Pick n Flick image ${index}`}
                  width={500}
                  height={500}
                  className='h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60'
                />
              </motion.div>
            ))}
          </div>
          <div className='mb-6 flex flex-wrap justify-start'>
            {[
              'HTML',
              'CSS',
              'JavaScript',
              'React',
              'Tailwind CSS',
              'Framer Motion',
              'Next.js',
              'AWS',
              'Elastic IP',
              'EC2 (Ubuntu)',
              'Nginx',
              'Docker',
              'Docker Compose',
            ].map((tag, index) => (
              <Tag key={index} tag={tag} />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: 'Gitpub',
      content: (
        <div>
          <p className='mb-6 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
            Search for breweries in your area and add custom entries or notes to
            your profile.
          </p>
          <p className='mb-6 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
            <span className='font-bold'>Front-end: </span> The front-end is
            built with Next.js and React.js, featuring animations with Framer
            Motion, and styled with Tailwind CSS and Shadcn UI.
          </p>
          <p className='mb-6 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
            <span className='font-bold'>Back-end: </span> The app is deployed
            via Github actions to Vercel, and uses Next Auth for authentication.
          </p>
          <div className='mb-6 grid grid-cols-2 gap-4'>
            {[GitpubDark, GitpubLight, GitpubSearch, GitpubSignIn].map(
              (imageSrc, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleImageClick(imageSrc)}>
                  <Image
                    src={imageSrc}
                    alt={`Gitpub image ${index}`}
                    width={500}
                    height={500}
                    className='h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60'
                  />
                </motion.div>
              ),
            )}
          </div>
          <div className='mb-6 flex flex-wrap justify-start'>
            {[
              'HTML',
              'CSS',
              'JavaScript',
              'React',
              'Tailwind CSS',
              'ShadcnUI',
              'MongoDB',
              'OpenBreweryDB',
              'Next Auth',
              'Vercel',
              'Next.js',
              'Github Actions',
            ].map((tag, index) => (
              <Tag key={index} tag={tag} />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: 'Password Generator',
      content: (
        <div>
          <p className='mb-6 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
            Custom, unique password generator with options for length and
            character types.
          </p>
          <div className='mb-6 grid grid-cols-2 gap-4'>
            {[
              PasswordGeneratorHome,
              PasswordGeneratorPrompt1,
              PasswordGeneratorPrompt2,
              PasswordGeneratorResult,
            ].map((imageSrc, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleImageClick(imageSrc)}>
                <Image
                  src={imageSrc}
                  alt={`Password Generator image ${index}`}
                  width={500}
                  height={500}
                  className='h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60'
                />
              </motion.div>
            ))}
          </div>
          <div className='mb-6 flex flex-wrap justify-start'>
            {['HTML', 'CSS', 'JavaScript', 'Github Pages'].map((tag, index) => (
              <Tag key={index} tag={tag} />
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className='w-full'>
      <Timeline data={data} />
      <ImageModal imageSrc={selectedImage} onClose={handleClose} />
    </div>
  );
}

// WORKING EXPANDING CARDS IN TIMELINE

// 'use client';

// import Image from 'next/image';
// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Timeline } from '../components/ui/Timeline';
// import PicknFlickHome from '../../public/assets/images/picknflick-home.png';
// import PicknFlickOptions from '../../public/assets/images/picknflick-options.png';
// import PicknFlickWelcome from '../../public/assets/images/picknflick-welcome.png';
// import PicknFlickWinner from '../../public/assets/images/picknflick-winner.png';
// import GitpubDark from '../../public/assets/images/gitpub-dark.png';
// import GitpubLight from '../../public/assets/images/gitpub-light.png';
// import GitpubSearch from '../../public/assets/images/gitpub-search.png';
// import GitpubSignIn from '../../public/assets/images/gitpub-sign-in.png';
// import PasswordGeneratorHome from '../../public/assets/images/password-generator-home.png';
// import PasswordGeneratorPrompt1 from '../../public/assets/images/password-generator-prompt-1.png';
// import PasswordGeneratorPrompt2 from '../../public/assets/images/password-generator-prompt-2.png';
// import PasswordGeneratorResult from '../../public/assets/images/password-generator-result.png';

// // Tag component for rendering tags
// const Tag = ({ tag }) => (
//   <span className='mb-2 mr-2 rounded-md bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700 md:text-sm'>
//     {tag}
//   </span>
// );

// // Modal and image expand component
// const ImageGrid = ({ images }) => {
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleClick = (image) => {
//     setSelectedImage(image);
//   };

//   const handleOutsideClick = () => {
//     setSelectedImage(null);
//   };

//   return (
//     <>
//       <div className='grid grid-cols-2 gap-4'>
//         {images.map((image, index) => (
//           <motion.div
//             key={index}
//             className='cursor-pointer'
//             whileHover={{ scale: 1.05 }}
//             onClick={() => handleClick({ image, index })}>
//             <Image
//               src={image}
//               alt={`Image ${index + 1}`}
//               width={500}
//               height={500}
//               className='h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60'
//             />
//           </motion.div>
//         ))}
//       </div>

//       <AnimatePresence>
//         {selectedImage && (
//           <motion.div
//             className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={handleOutsideClick}>
//             <motion.div
//               className='relative p-4'
//               onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking on the image itself
//               layoutId={`image-${selectedImage.index}`}>
//               <Image
//                 src={selectedImage.image}
//                 alt='Expanded Image'
//                 width={800}
//                 height={500}
//                 className='rounded-lg object-contain'
//               />
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default function NewWork() {
//   const data = [
//     {
//       title: 'Pick n Flick',
//       content: (
//         <div>
//           <p className='mb-6 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
//             Random decision maker allowing users to choose between 2 to 6
//             options, with spin momentum based on flick speed.
//           </p>
//           <p className='mb-6 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
//             <span className='font-bold'>Front-end: </span> The front-end is
//             built with Next.js and React.js, featuring animations with Framer
//             Motion, and styled with Tailwind CSS and Shadcn UI.
//           </p>
//           <p className='mb-6 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
//             <span className='font-bold'>Back-end: </span> The app is hosted on
//             an AWS EC2 instance (Ubuntu), using an Elastic IP with Nginx as a
//             reverse proxy. It is secured with/served over HTTPS using a
//             self-signed certificate, with Cron jobs for SSL certificate renewal.
//           </p>

//           <ImageGrid
//             images={[
//               PicknFlickHome,
//               PicknFlickOptions,
//               PicknFlickWelcome,
//               PicknFlickWinner,
//             ]}
//           />

//           <div className='mb-6 flex flex-wrap justify-start'>
//             {[
//               'HTML',
//               'CSS',
//               'JavaScript',
//               'React',
//               'Tailwind CSS',
//               'Framer Motion',
//               'Next.js',
//               'AWS',
//               'Elastic IP',
//               'EC2 (Ubuntu)',
//               'Nginx',
//               'Docker',
//               'Docker Compose',
//             ].map((tag, index) => (
//               <Tag key={index} tag={tag} />
//             ))}
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: 'Gitpub',
//       content: (
//         <div>
//           <p className='mb-6 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
//             Search for breweries in your area and add custom entries or notes to
//             your profile.
//           </p>
//           <p className='mb-6 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
//             <span className='font-bold'>Front-end: </span> The front-end is
//             built with Next.js and React.js, featuring animations with Framer
//             Motion, and styled with Tailwind CSS and Shadcn UI.
//           </p>
//           <ImageGrid
//             images={[GitpubDark, GitpubLight, GitpubSearch, GitpubSignIn]}
//           />
//         </div>
//       ),
//     },
//     {
//       title: 'Password Generator',
//       content: (
//         <div>
//           <p className='mb-6 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
//             Custom, unique password generator with options for length and
//             character types.
//           </p>
//           <ImageGrid
//             images={[
//               PasswordGeneratorHome,
//               PasswordGeneratorPrompt1,
//               PasswordGeneratorPrompt2,
//               PasswordGeneratorResult,
//             ]}
//           />
//           <div className='mb-6 flex flex-wrap justify-start'>
//             {['HTML', 'CSS', 'JavaScript', 'Github Pages'].map((tag, index) => (
//               <Tag key={index} tag={tag} />
//             ))}
//           </div>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className='w-full'>
//       <Timeline data={data} />
//     </div>
//   );
// }

// -------------------------------------- WORKING TIMELINE from ACETURNITY UI --------------------------------------

// 'use client';

// import Image from 'next/image';
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { cn } from '../lib/utils';
// import { Timeline } from '../components/ui/Timeline';
// import PicknFlickHome from '../../public/assets/images/picknflick-home.png';
// import PicknFlickOptions from '../../public/assets/images/picknflick-options.png';
// import PicknFlickWelcome from '../../public/assets/images/picknflick-welcome.png';
// import PicknFlickWinner from '../../public/assets/images/picknflick-winner.png';

// import GitpubDark from '../../public/assets/images/gitpub-dark.png';
// import GitpubLight from '../../public/assets/images/gitpub-light.png';
// import GitpubSearch from '../../public/assets/images/gitpub-search.png';
// import GitpubSignIn from '../../public/assets/images/gitpub-sign-in.png';
// // import GitpubSignedIn from '../../public/assets/images/gitpub-signed-in.png';

// import PasswordGeneratorHome from '../../public/assets/images/password-generator-home.png';
// import PasswordGeneratorPrompt1 from '../../public/assets/images/password-generator-prompt-1.png';
// import PasswordGeneratorPrompt2 from '../../public/assets/images/password-generator-prompt-2.png';
// import PasswordGeneratorResult from '../../public/assets/images/password-generator-result.png';

// const Tag = ({ tag }) => (
//   <span className='mb-2 mr-2 rounded-md bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700 md:text-sm'>
//     {tag}
//   </span>
// );

// export default function NewWork({ project }) {
//   const data = [
//     {
//       title: 'Pick n Flick',
//       content: (
//         <div>
//           <p className='mb-6 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
//             Random decision maker allowing users to choose between 2 to 6
//             options, with spin momentum based on flick speed.
//           </p>
//           <p className='mb-6 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
//             <span className='font-bold'>Front-end: </span> The front-end is
//             built with Next.js and React.js, featuring animations with Framer
//             Motion, and styled with Tailwind CSS and Shadcn UI.
//           </p>
//           <p className='mb-6 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
//             <span className='font-bold'>Back-end: </span>
//             The app is hosted on an AWS EC2 instance (Ubuntu), using an Elastic
//             IP with Nginx as a reverse proxy. It is secured with/served over
//             HTTPS using a self-signed certificate, with Cron jobs for SSL
//             certificate renewal.
//           </p>

//           <div className='mb-6 grid grid-cols-2 gap-4'>
//             <Image
//               src={PicknFlickHome}
//               alt='startup template'
//               width={500}
//               height={500}
//               className='h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60'
//             />
//             <Image
//               src={PicknFlickOptions}
//               alt='startup template'
//               width={500}
//               height={500}
//               className='h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60'
//             />
//             <Image
//               src={PicknFlickWelcome}
//               alt='startup template'
//               width={500}
//               height={500}
//               className='h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60'
//             />
//             <Image
//               src={PicknFlickWinner}
//               alt='startup template'
//               width={500}
//               height={500}
//               className='h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60'
//             />
//           </div>
//           <div className='mb-6 flex flex-wrap justify-start'>
//             {[
//               'HTML',
//               'CSS',
//               'JavaScript',
//               'React',
//               'Tailwind CSS',
//               'Framer Motion',
//               'Next.js',
//               'AWS',
//               'Elastic IP',
//               'EC2 (Ubuntu)',
//               'Nginx',
//               'Docker',
//               'Docker Compose',
//             ].map((tag, index) => (
//               <Tag key={index} tag={tag} />
//             ))}
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: 'Gitpub',
//       content: (
//         <div>
//           <p className='mb-6 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
//             Search for breweries in your area and add custom entries or notes to
//             your profile.
//           </p>
//           <p className='mb-6 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
//             <span className='font-bold'>Front-end: </span> The front-end is
//             built with Next.js and React.js, featuring animations with Framer
//             Motion, and styled with Tailwind CSS and Shadcn UI.
//           </p>
//           <p className='mb-6 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
//             <span className='font-bold'>Back-end: </span>The app is deployed via
//             Github actions to Vercel, and uses Next Auth for authentication.
//           </p>
//           <div className='mb-6 grid grid-cols-2 gap-4'>
//             <Image
//               src={GitpubDark}
//               alt='hero template'
//               width={500}
//               height={500}
//               className='h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60'
//             />
//             <Image
//               src={GitpubLight}
//               alt='feature template'
//               width={500}
//               height={500}
//               className='h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60'
//             />
//             <Image
//               src={GitpubSearch}
//               alt='bento template'
//               width={500}
//               height={500}
//               className='h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60'
//             />
//             <Image
//               src={GitpubSignIn}
//               alt='cards template'
//               width={500}
//               height={500}
//               className='h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60'
//             />
//           </div>

//           <div className='flex flex-wrap'>
//             {[
//               'HTML',
//               'CSS',
//               'JavaScript',
//               'React',
//               'Tailwind CSS',
//               'Framer Motion',
//               'Next.js',
//               'AWS',
//               'Elastic IP',
//               'EC2 (Ubuntu)',
//               'Nginx',
//               'Docker',
//               'Docker Compose',
//             ].map((tag, index) => (
//               <Tag key={index} tag={tag} />
//             ))}
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: 'Password Generator',
//       content: (
//         <div>
//           <p className='mb-6 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
//             Custom, unique password generator with options for length and
//             character types.
//           </p>
//           <p className='mb-6 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
//             Built using Javascript, HTML, CSS and is deployed via Github Pages.
//           </p>

//           <div className='mb-6 grid grid-cols-2 gap-4'>
//             <Image
//               src={PasswordGeneratorHome}
//               alt='hero template'
//               width={500}
//               height={500}
//               className='h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60'
//             />
//             <Image
//               src={PasswordGeneratorPrompt1}
//               alt='feature template'
//               width={500}
//               height={500}
//               className='h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60'
//             />
//             <Image
//               src={PasswordGeneratorPrompt2}
//               alt='bento template'
//               width={500}
//               height={500}
//               className='h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60'
//             />
//             <Image
//               src={PasswordGeneratorResult}
//               alt='cards template'
//               width={500}
//               height={500}
//               className='h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60'
//             />
//           </div>

//           <div className='mb-6 flex flex-wrap justify-start'>
//             {['HTML', 'CSS', 'JavaScript', 'Github Pages'].map((tag, index) => (
//               <Tag key={index} tag={tag} />
//             ))}
//           </div>
//         </div>
//       ),
//     },
//   ];
//   return (
//     <div className='w-full'>
//       <Timeline data={data} />
//     </div>
//   );
// }
