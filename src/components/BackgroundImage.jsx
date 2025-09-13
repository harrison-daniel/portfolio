import Image from 'next/image';
import BgCircuit from '../../public/assets/images/bg-circuit.png';

export default function BackgroundImage() {
  return (
    <Image
      src={BgCircuit}
      className='pointer-events-none fixed w-full select-none opacity-[11.5%] sm:opacity-[6.5%]'
      // fixed w-full opacity-[11.5%] sm:opacity-[6.5%]
      placeholder='blur'
      alt='motherboard lines background picture'
      quality={100}
      style={{
        zIndex: -1,
      }}
    />
  );
}
