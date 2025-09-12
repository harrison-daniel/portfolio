import Image from 'next/image';
import BgCircuit from '../../public/assets/images/bg-circuit.png';

export default function BackgroundImage() {
  return (
    <Image
      src={BgCircuit}
      className='fixed w-full opacity-[8.5%] md:opacity-[5.5%]'
      placeholder='blur'
      alt='motherboard lines background picture'
      quality={100}
      style={{
        zIndex: -1,
      }}
    />
  );
}
