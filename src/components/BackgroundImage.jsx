'use client';
import Image from 'next/image';
import BgCircuit from '../../public/assets/images/bg-circuit.png';

export default function BackgroundImage() {
  return (
    <Image
      src={BgCircuit}
      className='fixed h-full opacity-[8.5%] md:h-auto md:w-full md:opacity-[5.5%]'
      placeholder='blur'
      quality={100}
      style={{
        zIndex: -1,
      }}
    />
  );
}

// 'use client';
// import Image from 'next/image';
// import { motion, AnimatePresence, useInView } from 'framer-motion';
// import BackgroundBeams from '../components/ui/Background-beams';
// import BgCircuit from '../../public/assets/images/bg-circuit.png';
// export default function BackgroundImage() {
//   return (
//     <>
//       <div className='fixed -z-10 h-screen w-screen overflow-hidden opacity-[75%]'>
//         <div className='absolute inset-0 bg-cover bg-center' />
//         <Image src={BgCircuit} className='opacity-10' />
//         <BackgroundBeams />
//       </div>
//       {/* <div>
//         <BackgroundBeams className='fixed top-0 -z-10' />
//         <Image
//           src={BgCircuit}
//           className='fixed h-full opacity-[8.5%] md:h-auto md:w-full md:opacity-[5.5%] lg:opacity-[5.5%]'
//           placeholder='blur'
//           quality={100}
//           style={{
//             zIndex: -1,
//           }}
//         />
//       </div> */}
//     </>
//   );
// }
