'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import StackingCards, { StackingCardItem } from './ui/stacking-cards';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import PicknFlickHome from '../../public/assets/images/picknflick-home.png';
import GitPubHome from '../../public/assets/images/gitpub-dark.png';
import SetLoopImg from '../../public/assets/images/SetLoopScreenshot.png';
import PortfolioScreenshot from '../../public/assets/images/portfolio-screenshot.png';
import HomeAssistantServerScreenshot from '../../public/assets/images/ha-server-screenshot.png';
import { VIDEO_URLS } from '../lib/videoUrls';

function ModalPortal({ children }) {
  if (typeof window === 'undefined') return null;
  return createPortal(children, document.body);
}

const Tag = ({ children }) => (
  <span className='rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-white/10 dark:text-neutral-200 md:text-sm'>
    {children}
  </span>
);

export default function Work() {
  const [openVideo, setOpenVideo] = useState(
    /** @type {null | 'pf' | 'gp' | 'sl'} */ (null),
  );
  const openerRef = useRef(/** @type {HTMLElement | null} */ (null));

  const mediaBox =
    'group relative mt-4 w-full max-w-[560px] sm:max-w-[620px] mx-auto ' +
    'flex-1 min-h-[120px] sm:min-h-[180px] overflow-hidden rounded-lg';

  const videoClasses = 'h-full w-full object-cover';

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
      case 'sl':
        return {
          src: VIDEO_URLS.setLoop.src,
          poster: SetLoopImg.src,
          label: 'SetLoop demo video',
        };
      case 'gp':
        return {
          src: VIDEO_URLS.gitpub.src,
          poster: GitPubHome.src,
          label: 'GitPub demo video',
        };
      case 'pf':
        return {
          src: VIDEO_URLS.picknflick.src,
          poster: PicknFlickHome.src,
          label: 'Pick n Flick demo video',
        };
      default:
        return null;
    }
  })();

  return (
    <div className='w-full'>
      <StackingCards
        totalCards={5}
        scaleMultiplier={0.03}
        className='relative mx-auto max-w-3xl'>
        <div className='z-10 flex w-full flex-col items-center justify-center'>
          <h2 className='pb-0 text-center text-3xl font-bold md:text-4xl'>
            My Work
          </h2>
        </div>

        {/* ---------- CARD 1 · SetLoop ---------- */}
        <StackingCardItem index={0} className='h-[620px]'>
          <div className='relative mx-auto flex h-[85%] w-11/12 rounded-3xl'>
            <article className='flex h-full w-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-black md:p-6'>
              <header className='mb-3'>
                <h3 className='text-2xl font-bold text-neutral-900 dark:text-white'>
                  SetLoop
                </h3>
                <p className='mt-2 text-sm text-neutral-700 dark:text-neutral-300'>
                  Voice-controlled video looper for Chrome &mdash; loop any
                  section, change speed, and bookmark moments hands-free or via
                  customizable overlay buttons.
                </p>
                <p className='mt-2 text-xs text-neutral-800 dark:text-neutral-200 md:text-sm'>
                  <span className='font-bold'>Stack: </span>
                  Chrome MV3, vanilla JS, Web Speech API, fuzzy grammar parser,
                  ~100&nbsp;KB shipped <br />
                  <span className='font-bold'>Infra: </span>
                  Cloudflare Pages, GitHub Actions.
                </p>
              </header>

              <div className={mediaBox}>
                <video
                  className={videoClasses}
                  src={VIDEO_URLS.setLoop.src}
                  poster={SetLoopImg.src}
                  playsInline
                  muted
                  loop
                  autoPlay
                  preload='metadata'
                />
                <button
                  type='button'
                  aria-label='Enlarge SetLoop demo'
                  className='absolute inset-0'
                  onClick={(e) => {
                    openerRef.current = e.currentTarget;
                    setOpenVideo('sl');
                  }}
                />
              </div>

              <div className='mt-4 flex flex-wrap gap-2'>
                {[
                  'JavaScript',
                  'Chrome Extension',
                  'Web Speech API',
                  'Cloudflare Pages',
                  'GitHub Actions',
                ].map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>

              <div className='mt-auto flex flex-wrap gap-3 pt-4'>
                <Link
                  href='https://setloop.app'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Open SetLoop site in a new tab'
                  className='group inline-flex items-center justify-center gap-2 rounded-md border border-black px-3 py-2 font-semibold leading-none text-black ring-1 ring-transparent transition-transform hover:-translate-y-0.5 hover:text-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 dark:border-white dark:text-white'>
                  <span>Visit Site</span>
                  <ExternalLink
                    aria-hidden='true'
                    className='h-4 w-4 transition-transform group-hover:translate-x-1'
                  />
                </Link>
                <Link
                  href='https://github.com/harrison-daniel/SetLoop'
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

        {/* ---------- CARD 2 · GitPub ---------- */}
        <StackingCardItem index={1} className='h-[620px]'>
          <div className='relative mx-auto flex h-[85%] w-11/12'>
            <article className='flex h-full w-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-black md:p-6'>
              <header className='mb-3'>
                <h3 className='text-2xl font-bold text-neutral-900 dark:text-white'>
                  GitPub
                </h3>
                <p className='mt-2 text-sm text-neutral-700 dark:text-neutral-300'>
                  Search breweries by area, view results in a sortable table,
                  sign in with NextAuth, and save custom entries and notes to
                  your profile.
                </p>
                <p className='mt-2 text-xs text-neutral-800 dark:text-neutral-200 md:text-sm'>
                  <span className='font-bold'>Stack: </span>
                  Next.js App Router, TypeScript, NextAuth, MongoDB/Mongoose,
                  TanStack Table <br />
                  <span className='font-bold'>Infra: </span>
                  Vercel + Analytics &amp; Speed Insights, GitHub Actions.
                </p>
              </header>

              <div className={mediaBox}>
                <video
                  className={videoClasses}
                  src={VIDEO_URLS.gitpub.src}
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

              <div className='mt-4 flex flex-wrap gap-2'>
                {[
                  'TypeScript',
                  'Next.js',
                  'MongoDB',
                  'NextAuth',
                  'Vercel',
                  'OpenBreweryDB',
                ].map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>

              <div className='mt-auto flex flex-wrap gap-3 pt-4'>
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

        {/* ---------- CARD 3 · Pick n Flick ---------- */}
        <StackingCardItem index={2} className='h-[620px]'>
          <div className='relative mx-auto flex h-[85%] w-11/12 rounded-3xl'>
            <article className='flex h-full w-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-black md:p-6'>
              <header className='mb-3'>
                <h3 className='text-2xl font-bold text-neutral-900 dark:text-white'>
                  Pick n Flick
                </h3>
                <p className='mt-2 text-sm text-neutral-700 dark:text-neutral-300'>
                  Random decision maker with spin momentum based on flick speed
                  &mdash; built for a native feel across devices.
                </p>
                <p className='mt-2 text-xs text-neutral-800 dark:text-neutral-200 md:text-sm'>
                  <span className='font-bold'>Stack: </span>
                  Next.js, TypeScript, React, Framer Motion &middot; Jest +
                  React Testing Library <br />
                  <span className='font-bold'>Infra: </span>
                  AWS EC2 (Ubuntu), Docker, Nginx.
                </p>
              </header>

              <div className={mediaBox}>
                <video
                  className={videoClasses}
                  src={VIDEO_URLS.picknflick.src}
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

              <div className='mt-4 flex flex-wrap gap-2'>
                {[
                  'TypeScript',
                  'Next.js',
                  'Framer Motion',
                  'Jest',
                  'AWS EC2',
                ].map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>

              <div className='mt-auto flex flex-wrap gap-3 pt-4'>
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

        {/* ---------- CARD 4 · Home Automation ---------- */}
        <StackingCardItem index={3} className='h-[620px]'>
          <div className='relative mx-auto flex h-[85%] w-11/12'>
            <article className='flex h-full w-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-black md:p-6'>
              <header className='mb-3'>
                <h3 className='text-2xl font-bold text-neutral-900 dark:text-white'>
                  Home Automation
                </h3>
                <p className='mt-2 text-sm text-neutral-700 dark:text-neutral-300'>
                  Next.js dashboard for local control of LG TV and Philips Hue
                  lights, backed by a Python/FastAPI server driving the LG webOS
                  and Hue APIs.
                </p>
                <p className='mt-2 text-xs text-neutral-800 dark:text-neutral-200 md:text-sm'>
                  <span className='font-bold'>Frontend: </span>
                  Next.js 15, TypeScript, Tailwind CSS v4 <br />
                  <span className='font-bold'>Backend: </span>
                  Python, FastAPI, Docker &middot; VLAN-segmented UniFi network.
                </p>
              </header>

              <div className={mediaBox}>
                <Image
                  src={HomeAssistantServerScreenshot}
                  alt='Home Assistant server dashboard'
                  className='h-full w-full object-cover'
                  placeholder='blur'
                />
              </div>

              <div className='mt-4 flex flex-wrap gap-2'>
                {['Next.js', 'TypeScript', 'Python', 'FastAPI', 'Docker'].map(
                  (t) => (
                    <Tag key={t}>{t}</Tag>
                  ),
                )}
              </div>
            </article>
          </div>
        </StackingCardItem>

        {/* ---------- CARD 5 · Portfolio ---------- */}
        <StackingCardItem index={4} className='h-[620px]'>
          <div className='relative mx-auto flex h-[85%] w-11/12 rounded-3xl'>
            <article className='flex h-full w-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-black md:p-6'>
              <header className='mb-3'>
                <h3 className='text-2xl font-bold text-neutral-900 dark:text-white'>
                  Portfolio
                </h3>
                <p className='mt-2 text-sm text-neutral-700 dark:text-neutral-300'>
                  This site &mdash; Place for my projects, media, and drone
                  work.
                </p>
                <p className='mt-2 text-xs text-neutral-800 dark:text-neutral-200 md:text-sm'>
                  <span className='font-bold'>Stack: </span>
                  Next.js, React, Framer Motion, Tailwind CSS, Zod <br />
                  <span className='font-bold'>Infra: </span>
                  Vercel, Cloudflare R2 for zero-egress media.
                </p>
              </header>

              <div className={mediaBox}>
                <Image
                  src={PortfolioScreenshot}
                  alt='Portfolio site screenshot'
                  className='h-full w-full object-cover'
                  placeholder='blur'
                />
              </div>

              <div className='mt-4 flex flex-wrap gap-2'>
                {[
                  'Next.js',
                  'React',
                  'Framer Motion',
                  'Cloudflare R2',
                  'Vercel',
                ].map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>

              <div className='mt-auto flex flex-wrap gap-3 pt-4'>
                <Link
                  href='https://www.harrisondaniel.dev'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Open portfolio in a new tab'
                  className='group inline-flex items-center justify-center gap-2 rounded-md border border-black px-3 py-2 font-semibold leading-none text-black ring-1 ring-transparent transition-transform hover:-translate-y-0.5 hover:text-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 dark:border-white dark:text-white'>
                  <span>Visit Site</span>
                  <ExternalLink
                    aria-hidden='true'
                    className='h-4 w-4 transition-transform group-hover:translate-x-1'
                  />
                </Link>
                <Link
                  href='https://github.com/harrison-daniel/portfolio'
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
