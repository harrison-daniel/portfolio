'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { VIDEO_URLS } from '../lib/videoUrls';
import part107Logo from '../../public/assets/images/Part 107 no BG.png';

const Chip = ({ children }) => (
  <span className='rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-white/10 dark:text-neutral-200'>
    {children}
  </span>
);

function PanelCard({ children }) {
  return (
    <div className='rounded-2xl border border-black/5 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-black/40 sm:p-6'>
      {children}
    </div>
  );
}

function TabPill({ active, children, ...props }) {
  return (
    <button
      type='button'
      className={[
        'relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold outline-none transition',
        'focus-visible:ring-2 focus-visible:ring-emerald-950/30 focus-visible:ring-offset-2',
        active
          ? 'text-neutral-900 dark:text-white'
          : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-300',
      ].join(' ')}
      {...props}>
      {children}
      {active && (
        <motion.span
          layoutId='about-pill'
          className='absolute inset-0 -z-10 rounded-full bg-black/5 dark:bg-white/10'
          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
        />
      )}
    </button>
  );
}

function useInViewAutoplay(ref, enabled = true) {
  const prefersReduced = useReducedMotion();
  const shouldRun = enabled && !prefersReduced;

  useEffect(() => {
    if (!shouldRun) return;

    const el = ref?.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        if (e.isIntersecting) el.play?.().catch(() => {});
        else el.pause?.();
      },
      { root: null, threshold: 0.25 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [ref, shouldRun]);
}

export default function AboutTabs() {
  const prefersReduced = useReducedMotion();

  const tabs = [
    { id: 'tools', label: 'Tech Stack' },
    { id: 'home_lab', label: 'Home Lab' },
    { id: 'drone', label: 'Drone Services' },
  ];

  const [active, setActive] = useState(tabs[0].id);

  const DronePanel = () => {
    const videoRef = useRef(null);
    useInViewAutoplay(videoRef, true);

    return (
      <PanelCard>
        <div className='flex flex-col gap-4 md:flex-row md:items-start'>
          <div className='w-full md:max-w-[360px]'>
            <div className='relative aspect-[4/3] overflow-hidden rounded-xl border border-black/5 bg-black/5 dark:border-white/10'>
              <video
                ref={videoRef}
                className='h-full w-full object-cover'
                src={VIDEO_URLS.droneReel.src}
                playsInline
                muted
                loop
                autoPlay={!prefersReduced}
                preload='metadata'
              />
            </div>

            <div className='mt-3 flex gap-3'>
              {/* <Link
                href='/drone'
                className='inline-flex items-center justify-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-neutral-900 transition hover:-translate-y-0.5 dark:border-white dark:text-white'>
                View full gallery
              </Link> */}
              <Link
                href='#contact'
                className='inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-black/5 dark:text-white dark:hover:bg-white/10'>
                Contact me for services
              </Link>
            </div>
          </div>

          <div className='flex-1'>
            <h3 className='text-base font-bold text-neutral-900 dark:text-white'>
              Drone
            </h3>
            <p className='mt-2 text-[0.95rem] leading-7 text-neutral-800 dark:text-neutral-200'>
              Part 107 certified. I fly a DJI Mini 3 Pro — 48MP photos, 4K/60fps
              video — and edit and color grade in Premiere Pro. Lately I&#39;ve
              been using automated flight paths to capture repeatable shots and
              before/after comparisons.
            </p>

            <div className='mt-4 flex flex-wrap gap-2'>
              {['DJI Mini 3 Pro', 'Premiere Pro', 'Litchi'].map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
            <div className='flex justify-center'>
              <Image src={part107Logo} alt='FAA Part 107 logo' width={120} />
            </div>
          </div>
        </div>
      </PanelCard>
    );
  };

  const content = useMemo(
    () => ({
      tools: (
        <PanelCard>
          <h3 className='text-base font-bold text-neutral-900 dark:text-white'>
            Tech Stack
          </h3>
          <p className='mt-2 text-[0.95rem] leading-7 text-neutral-800 dark:text-neutral-200'>
            <span className='font-semibold'>Languages: </span>
            TypeScript, JavaScript, Python, HTML/CSS
            <br />
            <span className='font-semibold'>Frontend: </span>
            React, Next.js, Tailwind CSS, Framer Motion, Zod
            <br />
            <span className='font-semibold'>Backend &amp; Data: </span>
            Node.js, Express, MongoDB, Mongoose, MySQL, REST APIs
            <br />
            <span className='font-semibold'>Cloud &amp; DevOps: </span>
            AWS (EC2, Lambda, API Gateway), Vercel, Cloudflare, Docker, GitHub
            Actions, CI/CD
          </p>
          <div className='mt-4 flex flex-wrap gap-2'>
            {[
              'TypeScript',
              'React',
              'Next.js',
              'Python',
              'Node.js',
              'MongoDB',
              'AWS',
              'Docker',
            ].map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        </PanelCard>
      ),
      drone: <DronePanel />,
      home_lab: (
        <PanelCard>
          <h3 className='text-base font-bold text-neutral-900 dark:text-white'>
            Home Lab
          </h3>
          <p className='mt-2 text-[0.95rem] leading-7 text-neutral-800 dark:text-neutral-200'>
            UniFi network — Cloud Gateway Ultra, Switch Lite 8 PoE, two U7 Pro
            APs. VLANs segment IoT, main, and guest traffic. An Ubuntu server
            hosts Home Assistant and a few Dockerized services.
          </p>
          <ul className='mt-3 list-disc space-y-2 pl-5 text-[0.95rem] leading-7 text-neutral-800 dark:text-neutral-200'>
            <li>Currently testing self-hosted LLMs for local automation.</li>
          </ul>
          <div className='mt-4 flex flex-wrap gap-2'>
            {[
              'UniFi',
              'VLANs',
              'Ubuntu Server',
              'Docker',
              'Home Assistant',
            ].map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        </PanelCard>
      ),
    }),
    [prefersReduced],
  );

  return (
    <section className='mx-auto w-full max-w-3xl pt-10'>
      {/* Tablist */}
      <div className='border-b border-neutral-200 pb-3 dark:border-white/10'>
        <div
          role='tablist'
          aria-label='About sections'
          className={[
            'flex gap-2',
            'overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]',
            'scrollbar-none',
            'sm:flex-wrap sm:justify-center sm:overflow-visible',
            'justify-center',
          ].join(' ')}>
          {tabs.map((t) => {
            const isActive = active === t.id;
            return (
              <TabPill
                key={t.id}
                role='tab'
                aria-selected={isActive}
                aria-controls={`panel-${t.id}`}
                id={`tab-${t.id}`}
                active={isActive}
                onClick={() => setActive(t.id)}>
                {t.label}
              </TabPill>
            );
          })}
        </div>
      </div>

      {/* Panel */}
      <div className='pt-5'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={active}
            role='tabpanel'
            id={`panel-${active}`}
            aria-labelledby={`tab-${active}`}
            tabIndex={0}
            initial={prefersReduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.18 }}>
            {content[active]}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
