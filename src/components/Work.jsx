'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import StackingCards, { StackingCardItem } from './ui/stacking-cards';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import PicknFlickHome from '../../public/assets/images/picknflick-home.png';
import GitPubHome from '../../public/assets/images/gitpub-dark.png';
import PasswordGeneratorHome from '../../public/assets/images/password-generator-home.png';

function ModalPortal({ children }) {
  if (typeof window === 'undefined') return null;
  return createPortal(children, document.body);
}

const Tag = ({ children }) => (
  <span className='rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 md:text-sm'>
    {children}
  </span>
);

export default function Work() {
  const [openVideo, setOpenVideo] = useState(
    /** @type {null | 'pf' | 'gp' | 'pg'} */ null,
  );
  const openerRef = useRef(
    /** @type {React.RefObject<HTMLElement | null>} */ null,
  );

  const mediaBox =
    'group relative mt-4 w-full max-w-[560px] sm:max-w-[620px] mx-auto ' +
    'aspect-[5/4] sm:aspect-[4/3] overflow-hidden rounded-lg';

  useEffect(() => {
    if (!openVideo) return;

    const html = document.documentElement;
    const body = document.body;
    const lastActive = document.activeElement;
    const sx = window.scrollX;
    const sy = window.scrollY;
    const prevScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';

    const prevPos = body.style.position;
    const prevTop = body.style.top;
    const prevLeft = body.style.left;
    const prevRight = body.style.right;
    const prevWidth = body.style.width;
    const prevOverflow = body.style.overflow;
    const prevTouch = body.style.touchAction;

    body.style.position = 'fixed';
    body.style.top = `-${sy}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    body.style.touchAction = 'none';

    const onKey = (e) => e.key === 'Escape' && setOpenVideo(null);
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);

      body.style.position = prevPos;
      body.style.top = prevTop;
      body.style.left = prevLeft;
      body.style.right = prevRight;
      body.style.width = prevWidth;
      body.style.overflow = prevOverflow;
      body.style.touchAction = prevTouch;

      window.scrollTo(sx, sy);
      html.style.scrollBehavior = prevScrollBehavior;

      if (openerRef.current && 'focus' in openerRef.current) {
        openerRef.current.focus({ preventScroll: true });
      } else if (lastActive && lastActive instanceof HTMLElement) {
        lastActive.focus({ preventScroll: true });
      }
    };
  }, [openVideo]);

  const modalVideo = (() => {
    switch (openVideo) {
      case 'pf':
        return {
          src: 'https://gywerkftomqz071v.public.blob.vercel-storage.com/PicknFlick%20Video%20Small.mp4',
          poster: PicknFlickHome.src,
          label: 'Pick n Flick demo video',
        };
      case 'gp':
        return {
          src: 'https://gywerkftomqz071v.public.blob.vercel-storage.com/GitPub%20Video%20mobile%20small.mp4',
          poster: GitPubHome.src,
          label: 'GitPub demo video',
        };
      case 'pg':
        return {
          src: 'https://gywerkftomqz071v.public.blob.vercel-storage.com/Password%20Generator%20Video%20Small.mp4',
          poster: PasswordGeneratorHome.src,
          label: 'Password Generator demo video',
        };
      default:
        return null;
    }
  })();

  return (
    <div className='w-full'>
      <StackingCards
        totalCards={3}
        scaleMultiplier={0.03}
        className='relative mx-auto max-w-3xl'>
        <div className='relative z-10 flex w-full items-center justify-center'>
          <h2 className='pb-12 text-center text-3xl font-bold md:text-4xl'>
            My Work
          </h2>
        </div>

        {/* ---------- CARD 1 ---------- */}
        <StackingCardItem index={0} className='h-[620px]'>
          <div className='relative mx-auto flex h-[85%] w-11/12 rounded-3xl'>
            <article className='flex h-full w-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-black md:p-6'>
              <header className='mb-4'>
                <h3 className='text-2xl font-bold text-neutral-900 dark:text-white'>
                  Pick n Flick
                </h3>
                <p className='mt-2 max-w-prose text-sm text-neutral-700 dark:text-neutral-300'>
                  Random decision maker with spin momentum based on flick speed.
                  Built for a fun, responsive feel across devices.
                </p>
                <p className='mb-4 text-xs text-neutral-800 dark:text-neutral-200 md:text-sm'>
                  <span className='font-bold'>Front-end: </span>
                  Next.js, React.js, Framer Motion, Tailwind CSS, Shadcn UI.
                </p>
                <p className='text-xs text-neutral-800 dark:text-neutral-200 md:text-sm'>
                  <span className='font-bold'>Back-end: </span>
                  AWS EC2 (Ubuntu), Elastic IP, Nginx reverse proxy, HTTPS
                  (self-signed), cron renewal.
                </p>
              </header>

              {/* --------- VIDEO START --------- */}
              <div className={mediaBox}>
                <video
                  className='h-full w-full object-cover'
                  src='https://gywerkftomqz071v.public.blob.vercel-storage.com/PicknFlick%20Video%20Small.mp4'
                  poster={PicknFlickHome.src}
                  playsInline
                  muted
                  loop
                  autoPlay
                  preload='metadata'
                />
                <button
                  type='button'
                  aria-label='Enlarge Pick n Flick demo'
                  className='absolute inset-0'
                  onClick={(e) => {
                    openerRef.current = e.currentTarget;
                    setOpenVideo('pf');
                  }}
                />
              </div>

              {/* --------- VIDEO END --------- */}

              {/* Tags */}
              <div className='mt-6 flex flex-wrap gap-2'>
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
                ].map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>

              <div className='mt-auto flex flex-wrap gap-3 pt-6'>
                <Link
                  href='https://harrisondaniel.dev'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Open Pick n Flick in a new tab'
                  className='group inline-flex items-center justify-center gap-2 rounded-md border border-black px-3 py-2 font-semibold leading-none text-black ring-1 ring-transparent transition-transform hover:-translate-y-0.5 hover:text-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 dark:border-white dark:text-white'>
                  <span>Visit Site</span>
                  <ExternalLink
                    aria-hidden='true'
                    className='h-4 w-4 transition-transform group-hover:translate-x-1'
                  />
                </Link>
                <Link
                  href='https://github.com/harrison-daniel/picknflick'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group inline-flex items-center gap-2 rounded-md px-3 py-2 font-semibold leading-none text-black outline-none ring-1 ring-transparent transition-transform hover:-translate-y-0.5 hover:text-black/90 focus-visible:ring-2 focus-visible:ring-black/30 dark:text-white'>
                  <span>GitHub Repo</span>
                  <ExternalLink
                    aria-hidden='true'
                    className='h-4 w-4 transition-transform group-hover:translate-x-1'
                  />
                </Link>
              </div>
            </article>
          </div>
        </StackingCardItem>

        {/* ---------- CARD 2 ---------- */}
        <StackingCardItem index={1} className='h-[620px]'>
          <div className='relative mx-auto flex h-[85%] w-11/12'>
            <article className='flex h-full w-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-black md:p-6'>
              <header className='mb-4'>
                <h3 className='text-2xl font-bold text-neutral-900 dark:text-white'>
                  GitPub
                </h3>
                <p className='mt-2 max-w-prose text-sm text-neutral-700 dark:text-neutral-300'>
                  Search for breweries in your area and add custom entries or
                  notes to your profile.
                </p>
                <p className='mb-4 text-xs text-neutral-800 dark:text-neutral-200 md:text-sm'>
                  <span className='font-bold'>Front-end: </span>
                  Next.js, React.js, Framer Motion, Tailwind CSS, Shadcn UI.
                </p>
                <p className='text-xs text-neutral-800 dark:text-neutral-200 md:text-sm'>
                  <span className='font-bold'>Back-end: </span>
                  Deployed via GitHub Actions to Vercel, NextAuth for auth.
                </p>
              </header>
              {/* --------- VIDEO --------- */}

              <div className={mediaBox}>
                <video
                  className='h-full w-full object-cover'
                  src='https://gywerkftomqz071v.public.blob.vercel-storage.com/GitPub%20Video%20mobile%20small.mp4'
                  poster={GitPubHome.src}
                  playsInline
                  muted
                  loop
                  autoPlay
                  preload='metadata'
                />
                <button
                  type='button'
                  aria-label='Enlarge GitPub demo'
                  className='absolute inset-0'
                  onClick={(e) => {
                    openerRef.current = e.currentTarget;
                    setOpenVideo('gp');
                  }}
                />
              </div>
              {/*  ----------- VIDEO END -------- */}

              {/*  Tags */}
              <div className='mt-6 flex flex-wrap gap-2'>
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
                ].map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>

              <div className='mt-auto flex flex-wrap gap-3 pt-6'>
                <Link
                  href='https://gitpub.vercel.app/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group inline-flex items-center justify-center gap-2 rounded-md border border-black px-3 py-2 font-semibold leading-none text-black ring-1 ring-transparent transition-transform hover:-translate-y-0.5 hover:text-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 dark:border-white dark:text-white'>
                  <span>Visit Site</span>
                  <ExternalLink
                    aria-hidden='true'
                    className='h-4 w-4 transition-transform group-hover:translate-x-1'
                  />
                </Link>
                <Link
                  href='https://github.com/harrison-daniel/gitpub'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group inline-flex items-center gap-2 rounded-md px-3 py-2 font-semibold leading-none text-black outline-none ring-1 ring-transparent transition-transform hover:-translate-y-0.5 hover:text-black/90 focus-visible:ring-2 focus-visible:ring-black/30 dark:text-white'>
                  <span>GitHub Repo</span>
                  <ExternalLink
                    aria-hidden='true'
                    className='h-4 w-4 transition-transform group-hover:translate-x-1'
                  />
                </Link>
              </div>
            </article>
          </div>
        </StackingCardItem>

        {/* ---------- CARD 3 ---------- */}
        <StackingCardItem index={2} className='h-[620px]'>
          <div className='relative mx-auto flex h-[85%] w-11/12'>
            <article className='flex h-full w-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-black md:p-6'>
              <header className='mb-4'>
                <h3 className='text-2xl font-bold text-neutral-900 dark:text-white'>
                  Password Generator
                </h3>
                <p className='mt-2 max-w-prose text-sm text-neutral-700 dark:text-neutral-300'>
                  Custom, unique password generator with options for length and
                  character types.
                </p>
              </header>
              {/* --------- VIDEO --------- */}
              <div className={mediaBox}>
                <video
                  className='h-full w-full object-cover'
                  src='https://gywerkftomqz071v.public.blob.vercel-storage.com/Password%20Generator%20Video%20Small.mp4'
                  poster={PasswordGeneratorHome.src}
                  playsInline
                  muted
                  loop
                  autoPlay
                  preload='metadata'
                />
                <button
                  type='button'
                  aria-label='Enlarge Password Generator demo'
                  className='absolute inset-0'
                  onClick={(e) => {
                    openerRef.current = e.currentTarget;
                    setOpenVideo('pg');
                  }}
                />
              </div>
              {/*  ----------- VIDEO END -------- */}

              {/* Tags */}
              <div className='mt-6 flex flex-wrap gap-2'>
                {['HTML', 'CSS', 'JavaScript', 'Github Pages'].map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>

              <div className='mt-auto flex flex-wrap gap-3 pt-6'>
                <Link
                  href='https://harrison-daniel.github.io/password-generator/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group inline-flex items-center justify-center gap-2 rounded-md border border-black px-3 py-2 font-semibold leading-none text-black ring-1 ring-transparent transition-transform hover:-translate-y-0.5 hover:text-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 dark:border-white dark:text-white'>
                  <span>Visit Site</span>
                  <ExternalLink
                    aria-hidden='true'
                    className='h-4 w-4 transition-transform group-hover:translate-x-1'
                  />
                </Link>
                <Link
                  href='https://github.com/harrison-daniel/password-generator'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group inline-flex items-center gap-2 rounded-md px-3 py-2 font-semibold leading-none text-black outline-none ring-1 ring-transparent transition-transform hover:-translate-y-0.5 hover:text-black/90 focus-visible:ring-2 focus-visible:ring-black/30 dark:text-white'>
                  <span>GitHub Repo</span>
                  <ExternalLink
                    aria-hidden='true'
                    className='h-4 w-4 transition-transform group-hover:translate-x-1'
                  />
                </Link>
              </div>
            </article>
          </div>
        </StackingCardItem>

        <div className='relative h-96 w-full' />
      </StackingCards>

      {modalVideo && (
        <ModalPortal>
          <div
            role='dialog'
            aria-modal='true'
            aria-label={modalVideo.label}
            className='fixed inset-0 z-[9999] flex items-center justify-center overscroll-none bg-black/80 p-4'
            onMouseDown={(e) => {
              if (e.currentTarget === e.target) setOpenVideo(null);
            }}>
            <div className='relative w-full max-w-4xl overflow-hidden rounded-xl shadow-2xl'>
              <video
                className='h-auto w-full object-contain'
                src={modalVideo.src}
                poster={modalVideo.poster}
                playsInline
                muted
                loop
                autoPlay
                controls
                preload='metadata'
              />
              <button
                type='button'
                onClick={() => setOpenVideo(null)}
                className='absolute right-3 top-3 rounded bg-black/60 px-2 py-1 text-sm text-white'
                aria-label='Close video'>
                Close
              </button>
            </div>
          </div>
        </ModalPortal>
      )}
    </div>
  );
}
