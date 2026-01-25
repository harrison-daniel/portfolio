import Image from 'next/image';
import RvaVectorMap from '../../public/assets/images/rva-vector-map.png';

export default function BackgroundImage() {
  return (
    <div className='pointer-events-none fixed inset-0 -z-10 overflow-hidden'>
      <Image
        src={RvaVectorMap}
        alt=''
        placeholder='blur'
        priority={false}
        className={[
          'select-none opacity-[0.13]',
          'absolute left-1/2 top-16 -translate-x-1/2',
          'w-[190vw] max-w-none sm:w-screen',
          'sm:opacity-[0.12]',
        ].join(' ')}
      />
    </div>
  );
}
