'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import sanitizeHtml from 'sanitize-html';
import axios from 'axios';
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from 'react-google-recaptcha-v3';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';
import { BsFillEnvelopeFill, BsFillTelephoneFill } from 'react-icons/bs';
import { BiDownload } from 'react-icons/bi';
import LoadingAnimation from './ui/LoadingAnimation';
import Link from 'next/link';

const Toast = ({ id, message, type = 'info', onClose, duration = 5000 }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onClose(id), 300);
  };

  const icons = {
    success: <CheckCircle className='h-5 w-5' />,
    error: <XCircle className='h-5 w-5' />,
  };

  const colors = {
    success: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-800',
      icon: 'text-emerald-600',
      progress: 'bg-emerald-600',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: 'text-red-600',
      progress: 'bg-red-600',
    },
  };

  const color = colors[type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.5 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className={`relative min-w-[300px] max-w-md overflow-hidden ${color.bg} ${color.border} ${color.text} rounded-lg border shadow-lg backdrop-blur-md ${isExiting ? 'pointer-events-none' : ''} `}>
      <div className='p-4'>
        <div className='flex items-start gap-3'>
          <div className={`${color.icon} mt-0.5 flex-shrink-0`}>
            {icons[type]}
          </div>

          <div className='min-w-0 flex-1'>
            <p className='text-sm font-medium'>{message}</p>
          </div>

          <button
            onClick={handleClose}
            className={` ${color.icon} hover:${color.text} ml-2 flex-shrink-0 transition-colors duration-200`}>
            <X className='h-4 w-4' />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      {duration && (
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: duration / 1000, ease: 'linear' }}
          className={`absolute bottom-0 left-0 right-0 h-1 ${color.progress} origin-left transform`}
        />
      )}
    </motion.div>
  );
};

// Toast Container Component
const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className='fixed right-4 top-4 z-50 flex flex-col gap-2'>
      <AnimatePresence mode='popLayout'>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
};

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
  message: z.string().min(1, { message: 'Message cannot be empty' }),
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
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info', duration = 5000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const onSubmit = async (data) => {
    if (!executeRecaptcha) {
      addToast('Recaptcha not yet available', 'error');
      return;
    }

    setLoading(true);

    // TEST DELAY - Remove this line when done testing
    await new Promise((resolve) => setTimeout(resolve, 50.9)); // Remove in production

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
        addToast('Message sent successfully!', 'success');
        reset();
      } else {
        addToast('Failed to send message. Please try again.', 'error');
      }
    } catch (error) {
      addToast('Failed to send message. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingAnimation isVisible={loading} message='Sending your message...' />

      {/* Toast Container */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <div className='mx-auto flex w-full max-w-md flex-col justify-center rounded-md bg-white p-3.5 shadow-md'>
        <form onSubmit={handleSubmit(onSubmit)} className='text-base'>
          {/* Name Field */}
          <div className='mb-3'>
            <label className='block text-base text-gray-700'>Name</label>
            <input
              type='text'
              {...register('name')}
              className={`mt-1 w-full rounded border border-gray-300 p-1 transition-all duration-200 ${
                loading
                  ? 'cursor-not-allowed opacity-50'
                  : 'focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
              }`}
              disabled={loading}
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
              className={`mt-1 w-full rounded border border-gray-300 p-1 transition-all duration-200 ${
                loading
                  ? 'cursor-not-allowed opacity-50'
                  : 'focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
              }`}
              disabled={loading}
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
              className={`mt-1 w-full rounded border border-gray-300 p-1 transition-all duration-200 ${
                loading
                  ? 'cursor-not-allowed opacity-50'
                  : 'focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
              }`}
              disabled={loading}
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
              className={`mt-1 w-full rounded border border-gray-300 p-1 transition-all duration-200 ${
                loading
                  ? 'cursor-not-allowed opacity-50'
                  : 'focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
              }`}
              rows='3'
              disabled={loading}
            />
            {errors.message && (
              <span className='text-red-500'>{errors.message.message}</span>
            )}
          </div>

          {/* Submit Button - Enhanced with better styling */}
          <div className='flex justify-center'>
            <button
              type='submit'
              className={`w-full rounded-lg bg-emerald-800 p-3 font-medium text-white transition-all duration-200 ${
                loading
                  ? 'cursor-not-allowed opacity-50'
                  : 'hover:bg-emerald-700 hover:shadow-lg active:scale-95 active:transform'
              }`}
              disabled={loading}>
              {loading ? 'Processing...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </>
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
