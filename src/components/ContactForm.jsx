'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
      'Invalid phone number'
    ),
  message: z.string().min(1),
  // message: z.string().nonempty('Message is required'),
});

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [toast, setToast] = useState({ message: '', type: '' });

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (event) => {
    const formattedPhoneNumber = formatPhoneNumber(event.target.value);
    setValue('phone', formattedPhoneNumber);
  };

  const onSubmit = async (data) => {
    if (!executeRecaptcha) {
      setToast({ message: 'Recaptcha not yet available', type: 'error' });
      return;
    }

    const recaptchaToken = await executeRecaptcha('contact_form');

    // Sanitize inputs
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
      console.error('Error sending message:', error);
      setToast({ message: 'Failed to send message.', type: 'error' });
    }
  };

  return (
    <div className='flex flex-col justify-center max-w-md mx-auto w-full p-4 bg-white rounded-md shadow-md'>
      <h1 className='text-black text-lg sm:text-xl md:text-2xl flex justify-center py-1 font-bold'>
        Contact Me
      </h1>
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: '' })}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className='text-sm sm:text-base'>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm sm:text-base'>
            Name
          </label>
          <input
            type='text'
            {...register('name')}
            className='w-full p-2 border border-gray-300 rounded mt-1'
          />
          {errors.name && (
            <span className='text-red-500'>{errors.name.message}</span>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm sm:text-base'>
            Email
          </label>
          <input
            type='email'
            {...register('email')}
            className='w-full p-2 border border-gray-300 rounded mt-1'
          />
          {errors.email && (
            <span className='text-red-500'>{errors.email.message}</span>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm sm:text-base'>
            Phone (optional)
          </label>
          <input
            type='text'
            {...register('phone')}
            onChange={handlePhoneChange}
            className='w-full p-2 border border-gray-300 rounded mt-1'
          />
          {errors.phone && (
            <span className='text-red-500'>{errors.phone.message}</span>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm sm:text-base'>
            Message
          </label>
          <textarea
            {...register('message')}
            className='w-full p-2 border border-gray-300 rounded mt-1'
            rows='2'></textarea>
          {errors.message && (
            <span className='text-red-500'>{errors.message.message}</span>
          )}
        </div>
        <div className='font-base tracking-wide text-center my-4'>
          <p className='space-x-1 text-xs'>
            This site is protected by reCAPTCHA and the Google{' '}
            <Link
              href='https://policies.google.com/privacy'
              className='text-blue-500 hover:underline'
              target='_blank'
              rel='noopener noreferrer'>
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link
              href='https://policies.google.com/terms'
              className='text-blue-500 hover:underline'
              target='_blank'
              rel='noopener noreferrer'>
              Terms of Service
            </Link>{' '}
            apply.
          </p>
        </div>
        <button
          type='submit'
          className='w-full bg-emerald-800 active:bg-emerald-700 text-white p-2 rounded g-recaptcha'>
          Send
        </button>
      </form>
    </div>
  );
};

const ContactFormWrapper = () => (
  <>
    <div
      className='flex justify-center flex-col min-h-screen mt-[8vh]'
      id='contact'>
      <div className=' '>
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
          <ContactForm />
        </GoogleReCaptchaProvider>
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
  </>
);

export default ContactFormWrapper;
