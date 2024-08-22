'use client';
import Image from 'next/image';
import BgCircuit from '../../public/assets/images/bg-circuit.png';

export default function BackgroundImage() {
  return (
    <Image
      src={BgCircuit}
      className='fixed h-full opacity-[40%] md:h-auto md:w-full md:opacity-[11%]'
      placeholder='blur'
      quality={100}
      style={{
        zIndex: -1,
      }}
    />
  );
}
