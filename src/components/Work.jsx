'use client';

import StackingCards, { StackingCardItem } from './ui/stacking-cards';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

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

const Tag = ({ children }) => (
  <span className='rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 md:text-sm'>
    {children}
  </span>
);

export default function Work() {
  return (
    <div className='w-full py-48'>
      <StackingCards
        totalCards={3}
        scaleMultiplier={0.03}
        className='relative mx-auto max-w-3xl'>
        {/* ---------- CARD 1 ---------- */}
        <StackingCardItem index={0}>
          <article className='flex h-full flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 md:backdrop-blur'>
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

            <div className='mt-4 grid grid-cols-2 gap-4'>
              {[
                { src: PicknFlickHome, alt: 'Pick n Flick — home' },
                { src: PicknFlickOptions, alt: 'Pick n Flick — options' },
                { src: PicknFlickWelcome, alt: 'Pick n Flick — welcome' },
                { src: PicknFlickWinner, alt: 'Pick n Flick — winner' },
              ].map((img, i) => (
                <div
                  key={i}
                  className='aspect-[16/10] overflow-hidden rounded-lg'>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    placeholder='blur'
                    sizes='(max-width: 640px) 50vw, 320px'
                    className='h-full w-full object-cover'
                  />
                </div>
              ))}
            </div>

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
        </StackingCardItem>

        {/* ---------- CARD 2 ---------- */}
        <StackingCardItem index={1}>
          <article className='flex h-full flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 md:backdrop-blur'>
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

            <div className='mt-4 grid grid-cols-2 gap-4'>
              {[
                { src: GitpubDark, alt: 'GitPub — dark theme' },
                { src: GitpubLight, alt: 'GitPub — light theme' },
                { src: GitpubSearch, alt: 'GitPub — search' },
                { src: GitpubSignIn, alt: 'GitPub — sign in' },
              ].map((img, i) => (
                <div
                  key={i}
                  className='aspect-[16/10] overflow-hidden rounded-lg'>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    placeholder='blur'
                    sizes='(max-width: 640px) 50vw, 320px'
                    className='h-full w-full object-cover'
                  />
                </div>
              ))}
            </div>

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
                href='hhttps://github.com/harrison-daniel/gitpub'
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
        </StackingCardItem>

        {/* ---------- CARD 3 ---------- */}
        <StackingCardItem index={2}>
          <article className='flex h-full flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 md:backdrop-blur'>
            <header className='mb-4'>
              <h3 className='text-2xl font-bold text-neutral-900 dark:text-white'>
                Password Generator
              </h3>
              <p className='mt-2 max-w-prose text-sm text-neutral-700 dark:text-neutral-300'>
                Custom, unique password generator with options for length and
                character types.
              </p>
            </header>

            <div className='mt-4 grid grid-cols-2 gap-4'>
              {[
                {
                  src: PasswordGeneratorHome,
                  alt: 'Password Generator — home',
                },
                {
                  src: PasswordGeneratorPrompt1,
                  alt: 'Password Generator — prompt',
                },
                {
                  src: PasswordGeneratorPrompt2,
                  alt: 'Password Generator — prompt options',
                },
                {
                  src: PasswordGeneratorResult,
                  alt: 'Password Generator — result',
                },
              ].map((img, i) => (
                <div
                  key={i}
                  className='aspect-[16/10] overflow-hidden rounded-lg'>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    placeholder='blur'
                    sizes='(max-width: 640px) 50vw, 320px'
                    className='h-full w-full object-cover'
                  />
                </div>
              ))}
            </div>

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
        </StackingCardItem>
      </StackingCards>
    </div>
  );
}
