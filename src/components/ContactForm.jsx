'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import sanitizeHtml from 'sanitize-html';
import axios from 'axios';
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from 'react-google-recaptcha-v3';
import Toast from './Toast';
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';
import { BsFillEnvelopeFill, BsFillTelephoneFill } from 'react-icons/bs';
import { BiDownload } from 'react-icons/bi';

import Link from 'next/link';

const schema = z.object({
  name: z.string().nonempty('Name is required'),
  email: z
    .string()
    .nonempty('Email is required')
    .email('Invalid email address'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[0-9]{10}$/.test(val.replace(/[^0-9]/g, '')),
      'Invalid phone number',
    ),
  message: z.string().min(1, { message: 'Message cannot be empty' }), // Custom error message
});

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  const onSubmit = async (data) => {
    if (!executeRecaptcha) {
      setToast({ message: 'Recaptcha not yet available', type: 'error' });
      return;
    }

    setLoading(true); // Set loading to true when submission starts

    const recaptchaToken = await executeRecaptcha('contact_form');

    const sanitizedData = {
      name: sanitizeHtml(data.name),
      email: sanitizeHtml(data.email),
      phone: data.phone ? sanitizeHtml(data.phone.replace(/[^0-9]/g, '')) : '',
      message: sanitizeHtml(data.message),
      recaptchaToken,
    };

    try {
      const response = await axios.post('/api/contact', sanitizedData);
      if (response.status === 200) {
        setToast({ message: 'Message sent successfully!', type: 'success' });
        reset();
      } else {
        setToast({ message: 'Failed to send message.', type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'Failed to send message.', type: 'error' });
    } finally {
      setLoading(false); // Set loading to false after submission is complete
    }
  };

  return (
    <div className='mx-auto flex w-full max-w-md flex-col justify-center rounded-md bg-white p-3.5 shadow-md'>
      {/* <h1 className='flex justify-center py-1 text-lg font-bold text-black sm:text-xl md:text-2xl'>
        Send a message
      </h1> */}
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: '' })}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className='text-base'>
        {/* Name Field */}
        <div className='mb-3'>
          <label className='block text-base text-gray-700'>Name</label>
          <input
            type='text'
            {...register('name')}
            className='mt-1 w-full rounded border border-gray-300 p-1'
            disabled={loading} // Disable input while loading
          />
          {errors.name && (
            <span className='text-red-500'>{errors.name.message}</span>
          )}
        </div>
        {/* Email Field */}
        <div className='mb-3'>
          <label className='block text-base text-gray-700'>Email</label>
          <input
            type='email'
            {...register('email')}
            className='mt-1 w-full rounded border border-gray-300 p-1'
            disabled={loading} // Disable input while loading
          />
          {errors.email && (
            <span className='text-red-500'>{errors.email.message}</span>
          )}
        </div>
        {/* Phone Field */}
        <div className='mb-3'>
          <label className='block text-base text-gray-700'>
            Phone (optional)
          </label>
          <input
            type='text'
            {...register('phone')}
            className='mt-1 w-full rounded border border-gray-300 p-1'
            disabled={loading} // Disable input while loading
          />
          {errors.phone && (
            <span className='text-red-500'>{errors.phone.message}</span>
          )}
        </div>
        {/* Message Field */}
        <div className='mb-3'>
          <label className='block text-base text-gray-700'>Message</label>
          <textarea
            {...register('message')}
            className='mt-1 w-full rounded border border-gray-300 p-1'
            rows='3'
            disabled={loading} // Disable input while loading
          />
          {errors.message && (
            <span className='text-red-500'>{errors.message.message}</span>
          )}
        </div>
        {/* Submit Button */}
        <div className='flex justify-center'>
          <button
            type='submit'
            className={`w-full rounded bg-emerald-800 p-2 text-white ${
              loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-emerald-700'
            }`}
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <div className='flex items-center justify-center'>
                <div className='h-5 w-5 animate-spin rounded-full border-b-2 border-t-2 border-white'></div>
                <span className='ml-2'>Sending...</span>
              </div>
            ) : (
              'Send'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

const ContactFormWrapper = () => (
  <div
    className='flex min-h-screen flex-col justify-normal pt-[12vh] md:justify-center md:pt-0 md:align-middle'
    id='contact'>
    <div>
      <h1 className='mb-2 flex justify-center py-1 text-3xl font-bold text-black sm:text-4xl md:mb-12 md:text-5xl'>
        Contact Me
      </h1>
    </div>
    <div>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
        <ContactForm />
      </GoogleReCaptchaProvider>
    </div>

    <div className='mt-[5vh] flex flex-col justify-center p-4'>
      <div className='mx-20 flex justify-center text-3xl'>
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
    <div className='mx-auto mt-6 flex justify-center'>
      <Link
        href='/HarrisonDanielResume.pdf'
        target='_blank'
        className='flex flex-row items-center gap-2 rounded-md bg-amber-600 px-2 py-1 text-lg font-bold text-neutral-900'>
        <BiDownload />
        Resume
      </Link>
    </div>
  </div>
);

export default ContactFormWrapper;
