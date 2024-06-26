'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { BsFillEnvelopeFill, BsFillTelephoneFill } from 'react-icons/bs';
import HdLogo1 from '../../public/assets/images/hd-logo-1.png';
import { BiDownload } from 'react-icons/bi';

const MOBILE_NAV_ITEMS = [
  { id: 0, navTitle: 'Home', href: '/', activeSection: '/' },

  { id: 1, navTitle: 'My Work', href: '/#work', activeSection: 'work' },

  { id: 2, navTitle: 'Contact', href: '/#contact', activeSection: 'contact' },
  {
    id: 3,
    navTitle: '',
    href: '/HarrisonDanielResume.pdf',
    newTab: true,
  },
];

export default function MobileNavbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setMobileNavOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const [activeSection, setActiveSection] = useState('/');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let foundSection = '';
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          foundSection = section.id;
        }
      });
      if (!foundSection) {
        setActiveSection('/');
      } else {
        setActiveSection(foundSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set the initial section on load
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMenuClick = () => setMobileNavOpen(!mobileNavOpen);

  const hideNavItemsVariant = {
    opened: {
      opacity: 0,
      y: '-100%',
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
    closed: {
      opacity: 1,
      y: '0%',
      transition: {
        delay: 1.1,
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  const mobileMenuVariant = {
    opened: {
      y: '0%',
      transition: {
        delay: 0.15,
        duration: 1.1,
        ease: [0.74, 0, 0.19, 1.02],
      },
    },
    closed: {
      y: '-100%',
      transition: {
        delay: 0.35,
        duration: 0.63,
        ease: [0.74, 0, 0.19, 1.02],
      },
    },
  };

  const fadeInVariant = {
    opened: {
      opacity: 1,
      transition: {
        delay: 1.2,
        duration: 0.5,
      },
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const ulVariant = {
    opened: {
      transition: {
        delayChildren: 1,
        staggerChildren: 0.18,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.06,
        staggerDirection: -1,
      },
    },
  };

  const liVariant = {
    opened: {
      opacity: 1,
      y: '0%',
      transition: {
        duration: 0.65,
        ease: 'easeOut',
      },
    },
    closed: {
      opacity: 0,
      y: '100%',
      transition: {
        duration: 0.25,
        ease: 'easeInOut',
      },
    },
  };

  const container = {
    size: 26,
  };

  const lines = {
    size: 4,
  };

  const animations = {
    container: {
      initial: {
        opacity: 1,
      },
      animate: {
        opacity: 1,
        transition: {
          duration: 0.5,
        },
      },
    },
    lines: [
      {
        initial: {
          y: 0,
          opacity: 1,
        },
        opened: {
          y: (container.size - lines.size) / 2,
          opacity: 1,
          transition: {
            y: { duration: 0.5, ease: 'easeInOut' },
          },
        },
        closed: {
          y: 0,
          opacity: 1,
          transition: {
            y: { duration: 0.5, ease: 'easeInOut' },
          },
        },
      },
      {
        initial: {
          y: (container.size - lines.size) / 2,
          height: lines.size,
          opacity: 1,
        },
        opened: {
          height: 0,
          opacity: 0,
          transition: {
            height: { duration: 0.5, ease: 'easeInOut' },
            opacity: { duration: 0.5 },
          },
        },
        closed: {
          height: lines.size,
          opacity: 1,
          transition: {
            height: { duration: 0.5, ease: 'easeInOut' },
            opacity: { duration: 0.5, delay: 0.2 },
          },
        },
      },
      {
        initial: {
          y: container.size - lines.size,
          opacity: 1,
        },
        opened: {
          y: (container.size - lines.size) / 2,
          opacity: 1,
          transition: {
            y: { duration: 0.5, ease: 'easeInOut' },
          },
        },
        closed: {
          y: container.size - lines.size,
          opacity: 1,
          transition: {
            y: { duration: 0.5, ease: 'easeInOut' },
          },
        },
      },
    ],
  };

  return (
    <motion.nav
      initial='closed'
      animate={mobileNavOpen ? 'opened' : 'closed'}
      className='flex flex-col'>
      <div className='flex justify-between items-center w-full p-2 px-4 bg-gray-100'>
        <motion.div
          variants={hideNavItemsVariant}
          className='text-2xl font-bold'>
          <Image src={HdLogo1} className='w-11' alt='Harrison Daniel Logo' />
        </motion.div>
        <motion.div
          initial={false}
          animate={mobileNavOpen ? 'opened' : 'closed'}
          variants={hideNavItemsVariant}
          onClick={handleMenuClick}
          className='cursor-pointer '>
          <motion.div
            className=''
            style={{ width: container.size, height: container.size }}
            variants={animations.container}
            animate='animate'>
            {animations.lines.map((_, index) => (
              <motion.div
                key={index}
                className='line bg-emerald-800'
                style={{ height: lines.size }}
                variants={animations.lines[index]}
                initial='initial'
                animate={mobileNavOpen ? 'opened' : 'closed'}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        variants={mobileMenuVariant}
        className='bg-neutral-50 fixed top-0 right-0 w-full h-full flex flex-col  gap-6'>
        <div className='flex justify-end items-center w-full p-4 '>
          <motion.div
            initial={false}
            animate={mobileNavOpen ? 'opened' : 'closed'}
            variants={fadeInVariant}
            onClick={() => setMobileNavOpen(false)}
            className='cursor-pointer '>
            <motion.div
              className=''
              style={{ width: container.size, height: container.size }}
              variants={animations.container}
              initial='initial'
              animate='animate'>
              {animations.lines.map((_, index) => (
                <motion.div
                  key={index}
                  className='line bg-emerald-800'
                  style={{ height: lines.size }}
                  variants={animations.lines[index]}
                  initial='initial'
                  animate={mobileNavOpen ? 'opened' : 'closed'}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
        <motion.ul
          variants={ulVariant}
          className='flex flex-col text-black items-center gap-9 font-bold text-2xl pt-10'>
          {MOBILE_NAV_ITEMS.map((navItem) => (
            <motion.li
              whileTap={{ scale: 0.95 }}
              key={navItem.id}
              onClick={() => setMobileNavOpen(false)}>
              <motion.div variants={liVariant}>
                {navItem.newTab ? (
                  <>
                    <Link
                      href='/HarrisonDanielResume.pdf'
                      target='_blank'
                      className='flex flex-row gap-2 items-center bg-amber-600 rounded-md py-1 px-2 text-neutral-900 '>
                      <BiDownload />
                      Resume
                    </Link>
                    <Link href={navItem.href} target='_blank'>
                      {navItem.navTitle}
                    </Link>
                  </>
                ) : (
                  <Link
                    href={navItem.href}
                    className={`  font-semibold uppercase   ${
                      activeSection === navItem.activeSection
                        ? 'text-emerald-700 '
                        : ''
                    }`}>
                    {navItem.navTitle}
                  </Link>
                )}
              </motion.div>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div variants={fadeInVariant} className='contact'>
          <div className='flex justify-center mx-20 mt-20 mb-8 text-3xl'>
            <ul className='flex gap-14'>
              <Link
                href='https://www.linkedin.com/in/harrisondaniel/'
                target='_blank'>
                <AiFillLinkedin />
              </Link>
              <Link href='https://github.com/harrison-daniel' target='_blank'>
                <AiFillGithub />
              </Link>
              <Link href='mailto:harrisonhjd@gmail.com'>
                <BsFillEnvelopeFill />
              </Link>
              <Link href='tel:+8045199827'>
                <BsFillTelephoneFill />
              </Link>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </motion.nav>
  );
}
