'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from 'react-google-recaptcha-v3';
import { toast } from 'sonner';
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';
import { BsFillEnvelopeFill, BsFillTelephoneFill } from 'react-icons/bs';
import { BiDownload } from 'react-icons/bi';
import LoadingAnimation from './ui/LoadingAnimation';
import Link from 'next/link';

const schema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email address').max(100, 'Email too long'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length === 0 || val.length === 10,
      'Phone must be exactly 10 digits',
    ),
  message: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(1000, 'Message too long (max 1000 characters)'),
});

const SOCIAL_LINKS = [
  {
    href: 'https://www.linkedin.com/in/harrisondaniel/',
    icon: AiFillLinkedin,
    label: 'LinkedIn Profile',
  },
  {
    href: 'https://github.com/harrison-daniel',
    icon: AiFillGithub,
    label: 'GitHub Profile',
  },
  {
    href: 'mailto:harrisonhjd@gmail.com',
    icon: BsFillEnvelopeFill,
    label: 'Send Email',
  },
  {
    href: 'tel:+8045199827',
    icon: BsFillTelephoneFill,
    label: 'Call Phone',
  },
];

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
  const [loading, setLoading] = useState(false);
  const [phoneDisplay, setPhoneDisplay] = useState('');

  const handlePhoneChange = (e) => {
    const input = e.target.value.replace(/\D/g, '').slice(0, 10);

    let formatted = '';
    if (input.length > 0) {
      if (input.length <= 3) {
        formatted = `(${input}`;
      } else if (input.length <= 6) {
        formatted = `(${input.slice(0, 3)}) ${input.slice(3)}`;
      } else {
        formatted = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(
          6,
        )}`;
      }
    }

    setPhoneDisplay(formatted);
    setValue('phone', input, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    if (!executeRecaptcha) {
      toast.error('Security check not ready. Please refresh and try again.');
      return;
    }

    setLoading(true);

    try {
      const recaptchaToken = await executeRecaptcha('contact_form');

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim().toLowerCase(),
          phone: data.phone || '',
          message: data.message.trim(),
          recaptchaToken,
        }),
      });

      const result = await response.json();

      if (response.status === 429) {
        toast.error('Too many attempts. Please try again in an hour.');
      } else if (!response.ok) {
        throw new Error(result.message || 'Failed to send');
      } else {
        toast.success("Message sent successfully! I'll get back to you soon.");
        reset();
        setPhoneDisplay('');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(
        'Failed to send message. Please try again or email directly.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingAnimation isVisible={loading} message='Sending your message...' />

      <div className='mx-auto w-full rounded-xl bg-white p-3 shadow-md sm:p-4 md:max-w-xl md:p-6'>
        <form onSubmit={handleSubmit(onSubmit)} className='text-base'>
          {/* Name Field */}
          <div className='mb-3 sm:mb-4'>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700 sm:text-base'>
              Name
            </label>
            <input
              id='name'
              type='text'
              tabIndex={1}
              enterKeyHint='next'
              autoComplete='name'
              {...register('name')}
              placeholder='John Doe'
              className={`mt-1 w-full rounded-md border p-2 text-sm transition-all duration-200 sm:p-3 sm:text-base ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } ${
                loading
                  ? 'cursor-not-allowed opacity-50'
                  : 'focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60'
              }`}
              disabled={loading}
              aria-invalid={errors.name ? 'true' : 'false'}
            />
            {errors.name && (
              <span className='mt-1 block text-xs text-red-500 sm:text-sm'>
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className='mb-3 sm:mb-4'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700 sm:text-base'>
              Email
            </label>
            <input
              id='email'
              type='email'
              tabIndex={2}
              enterKeyHint='next'
              inputMode='email'
              autoComplete='email'
              placeholder='john.doe@example.com'
              {...register('email')}
              className={`mt-1 w-full rounded-md border p-2 text-sm transition-all duration-200 sm:p-3 sm:text-base ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } ${
                loading
                  ? 'cursor-not-allowed opacity-50'
                  : 'focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60'
              }`}
              disabled={loading}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <span className='mt-1 block text-xs text-red-500 sm:text-sm'>
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Phone Field  */}
          <div className='mb-3 sm:mb-4'>
            <label
              htmlFor='phone'
              className='block text-sm font-medium text-gray-700 sm:text-base'>
              Phone (optional)
            </label>
            <input
              id='phone'
              type='tel'
              tabIndex={3}
              enterKeyHint='next'
              inputMode='tel'
              autoComplete='tel'
              value={phoneDisplay}
              onChange={handlePhoneChange}
              placeholder='(555) 123-4567'
              maxLength={14}
              className={`mt-1 w-full rounded-md border p-2 text-sm transition-all duration-200 sm:p-3 sm:text-base ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } ${
                loading
                  ? 'cursor-not-allowed opacity-50'
                  : 'focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60'
              }`}
              disabled={loading}
              aria-invalid={errors.phone ? 'true' : 'false'}
            />
            {errors.phone && (
              <span className='mt-1 block text-xs text-red-500 sm:text-sm'>
                {errors.phone.message}
              </span>
            )}
          </div>

          {/* Message Field */}
          <div className='mb-4'>
            <label
              htmlFor='message'
              className='block text-sm font-medium text-gray-700 sm:text-base'>
              Message
            </label>
            <textarea
              id='message'
              tabIndex={4}
              enterKeyHint='send'
              {...register('message')}
              placeholder='Your message here'
              className={`mt-1 w-full rounded-md border p-2 text-sm transition-all duration-200 sm:p-3 sm:text-base ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              } ${
                loading
                  ? 'cursor-not-allowed opacity-50'
                  : 'focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60'
              }`}
              rows={3}
              disabled={loading}
              aria-invalid={errors.message ? 'true' : 'false'}
            />
            {errors.message && (
              <span className='mt-1 block text-xs text-red-500 sm:text-sm'>
                {errors.message.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className='flex justify-center'>
            <button
              type='submit'
              className={`w-full rounded-lg bg-emerald-950 p-2.5 text-sm font-semibold text-white transition-all duration-200 sm:p-3 sm:text-base ${
                loading
                  ? 'cursor-not-allowed opacity-50'
                  : 'hover:bg-emerald-900 hover:shadow-md'
              }`}
              disabled={loading}>
              {loading ? 'Processing...' : 'Send Message'}
            </button>
          </div>

          <p className='mt-3 text-center text-[10px] text-gray-500 sm:mt-4 sm:text-xs'>
            Protected by reCAPTCHA •{' '}
            <a
              href='https://policies.google.com/privacy'
              target='_blank'
              rel='noopener noreferrer'
              className='underline hover:text-gray-700'>
              Privacy
            </a>{' '}
            •{' '}
            <a
              href='https://policies.google.com/terms'
              target='_blank'
              rel='noopener noreferrer'
              className='underline hover:text-gray-700'>
              Terms
            </a>
          </p>
        </form>
      </div>
    </>
  );
};

const ContactFormWrapper = () => (
  <div className='relative mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-6 sm:py-10 md:py-12'>
    <h1 className='mb-5 text-center text-2xl font-bold text-black sm:mb-8 sm:text-3xl md:text-4xl'>
      Contact Me
    </h1>

    {/* Form */}
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'body',
      }}>
      <ContactForm />
    </GoogleReCaptchaProvider>

    {/* Social Links */}
    <div className='mt-6 flex w-full flex-col items-center sm:mt-8'>
      <ul className='flex flex-wrap items-center justify-center gap-5 text-2xl sm:gap-8 sm:text-3xl'>
        {SOCIAL_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            className='transition-transform duration-200 hover:scale-110'
            aria-label={link.label}>
            <link.icon />
          </Link>
        ))}
      </ul>
    </div>

    {/* Resume Button */}
    <div className='mt-5 flex justify-center sm:mt-6'>
      <Link
        href='/HarrisonDanielResume.pdf'
        target='_blank'
        rel='noopener noreferrer'
        className='flex flex-row items-center gap-2 rounded-md border border-black px-3 py-1.5 text-sm font-bold text-neutral-900 transition-transform hover:-translate-y-0.5 sm:text-base'>
        <BiDownload />
        Resume
      </Link>
    </div>
  </div>
);

export default ContactFormWrapper;
