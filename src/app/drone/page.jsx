import Image from 'next/image';
import Link from 'next/link';
import { VIDEO_URLS } from '../../lib/videoUrls';

const stills = [
  { src: '/drone/stills/shot-1.jpg', alt: 'Aerial shot 1' },
  { src: '/drone/stills/shot-2.jpg', alt: 'Aerial shot 2' },
  { src: '/drone/stills/shot-3.jpg', alt: 'Aerial shot 3' },
  { src: '/drone/stills/shot-4.jpg', alt: 'Aerial shot 4' },
];

export default function DronePage() {
  return (
    <div className='mx-auto w-full max-w-5xl px-4 py-16'>
      <div className='mb-10'>
        <Link href='/#about' className='text-sm font-semibold underline'>
          ← Back to portfolio
        </Link>
        <h1 className='mt-4 text-4xl font-bold tracking-tight'>Drone work</h1>
        {/* <p className='mt-3 max-w-2xl text-[0.95rem] leading-7 text-neutral-700'></p> */}
      </div>

      <div className='relative mb-12 aspect-[16/9] overflow-hidden rounded-2xl border border-black/5 bg-black/5'>
        <video
          className='h-full w-full object-cover'
          src={VIDEO_URLS.droneReel.src}
          poster={VIDEO_URLS.droneReel.poster || '/drone/drone-poster.jpg'}
          playsInline
          muted
          loop
          autoPlay
          controls
          preload='metadata'
        />
      </div>

      <h2 className='text-2xl font-bold'>Stills</h2>
      <div className='mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {stills.map((s) => (
          <div
            key={s.src}
            className='overflow-hidden rounded-2xl border border-black/5 bg-white'>
            <Image
              src={s.src}
              alt={s.alt}
              width={1200}
              height={900}
              className='h-auto w-full object-cover'
            />
          </div>
        ))}
      </div>

      <div className='mt-12'>
        <Link
          href='/#contact'
          className='inline-flex items-center justify-center rounded-md border border-black px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:-translate-y-0.5'>
          Contact me
        </Link>
      </div>
    </div>
  );
}
