import Link from 'next/link';
import React from 'react';
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';
import { BsFillEnvelopeFill, BsFillTelephoneFill } from 'react-icons/bs';

export default function Contact() {
  return (
    <div className='min-h-screen ' id='contact'>
      <div className='pt-48'>
        {/* Contact Form */}
        <div className='flex justify-center'>
          <div className='w-full max-w-md'>
            <form className='bg-white shadow-md rounded px-8 pt-12 pb-8 mb-4'>
              <div className='mb-4'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='yourEmail'>
                  Your Email
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='email'
                  type='text'
                  placeholder='name@email.com'
                  required
                />
              </div>
              <div className='mb-4'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='subject'>
                  Subject
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='subject'
                  type='text'
                  placeholder='Let me know how I can help you'
                />
              </div>
              <div className='mb-4'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='message'>
                  Your Message
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='message'
                  type='text'
                  placeholder='Leave a comment..'
                  required
                />
              </div>
              <div className='flex items-center justify-between'>
                <button
                  className='bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded'
                  type='submit'>
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

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
      </div>
    </div>
  );
}
