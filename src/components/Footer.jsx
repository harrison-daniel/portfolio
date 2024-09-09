'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import Link from 'next/link';
import Image from 'next/image';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { BsFillEnvelopeFill, BsFillTelephoneFill } from 'react-icons/bs';
import HdLogo1 from '../../public/assets/images/hd-logo-1.png';
import { BiDownload } from 'react-icons/bi';

export default function Footer() {
  return (
    <>
      <div>
        <div className='m-0 p-0'>
          <p
            className='relative z-10 flex justify-center p-9 text-black opacity-100'
            id='footer-text'>
            @Harrison Daniel 2024
          </p>
        </div>
      </div>
    </>
  );
}
