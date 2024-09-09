import Link from 'next/link';
import React from 'react';
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';
import { BsFillEnvelopeFill, BsFillTelephoneFill } from 'react-icons/bs';

export default function Contact() {
  return (
    <div className='min-h-screen' id='contact'>
      <div className='pt-48'>
        {/* Contact Form */}
        <div className='flex justify-center'>
          <div className='w-full max-w-md'>
            <form className='mb-4 rounded bg-white px-8 pb-8 pt-12 shadow-md'>
              <div className='mb-4'>
                <label
                  className='mb-2 block text-sm font-bold text-gray-700'
                  htmlFor='yourEmail'>
                  Your Email
                </label>
                <input
                  className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
                  id='email'
                  type='text'
                  placeholder='name@email.com'
                  required
                />
              </div>
              <div className='mb-4'>
                <label
                  className='mb-2 block text-sm font-bold text-gray-700'
                  htmlFor='subject'>
                  Subject
                </label>
                <input
                  className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
                  id='subject'
                  type='text'
                  placeholder='Let me know how I can help you'
                />
              </div>
              <div className='mb-4'>
                <label
                  className='mb-2 block text-sm font-bold text-gray-700'
                  htmlFor='message'>
                  Your Message
                </label>
                <input
                  className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
                  id='message'
                  type='text'
                  placeholder='Leave a comment..'
                  required
                />
              </div>
              <div className='flex items-center justify-between'>
                <button
                  className='rounded bg-emerald-800 px-4 py-2 font-bold text-white hover:bg-emerald-700'
                  type='submit'>
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* <div className='mx-20 mb-8 mt-20 flex justify-center bg-red-500 text-3xl'>
          <ul className='flex gap-14 bg-red-500'>
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
        </div> */}
      </div>
    </div>
  );
}
