'use client';
import Image from 'next/image';
import BgCircuit from '../../public/assets/images/bg-circuit.png';
// import circuit from '../../public/assets/images/circuit.jpeg';
// import BgAdobe from '../../public/assets/images/bg-adobe.png';

export default function BackgroundImage() {
  return (
    <Image
      src={BgCircuit}
      className='fixed  h-full md:w-full md:h-auto  md:opacity-[11%] opacity-[40%] '
      //  src={BgAdobe}
      // className='fixed  h-full md:w-full md:h-auto  lg:opacity-[9%] opacity-[40%] '
      placeholder='blur'
      quality={100}
      style={{
        zIndex: -1,
      }}
    />
  );
}
