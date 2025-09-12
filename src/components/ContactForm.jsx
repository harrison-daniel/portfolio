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

  // Format phone number as user types
  const handlePhoneChange = (e) => {
    // Remove all non-digits and limit to 10
    const input = e.target.value.replace(/\D/g, '').slice(0, 10);

    // Format the display
    let formatted = '';
    if (input.length > 0) {
      if (input.length <= 3) {
        formatted = `(${input}`;
      } else if (input.length <= 6) {
        formatted = `(${input.slice(0, 3)}) ${input.slice(3)}`;
      } else {
        formatted = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6)}`;
      }
    }

    setPhoneDisplay(formatted);
    // Store only digits in the form
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
        setPhoneDisplay(''); // Clear phone display
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

      <div className='mx-auto flex w-[90%] max-w-md flex-col justify-center rounded-md bg-white p-3.5 shadow-md'>
        <form onSubmit={handleSubmit(onSubmit)} className='text-base'>
          {/* Name Field */}
          <div className='mb-3'>
            <label htmlFor='name' className='block text-base text-gray-700'>
              Name
            </label>
            <input
              id='name'
              type='text'
              {...register('name')}
              placeholder='John Doe'
              className={`mt-1 w-full rounded border p-1 transition-all duration-200 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } ${
                loading
                  ? 'cursor-not-allowed opacity-50'
                  : 'focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
              }`}
              disabled={loading}
              aria-invalid={errors.name ? 'true' : 'false'}
            />
            {errors.name && (
              <span className='text-sm text-red-500'>
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className='mb-3'>
            <label htmlFor='email' className='block text-base text-gray-700'>
              Email
            </label>
            <input
              id='email'
              type='email'
              {...register('email')}
              placeholder='john.doe@example.com'
              className={`mt-1 w-full rounded border p-1 transition-all duration-200 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } ${
                loading
                  ? 'cursor-not-allowed opacity-50'
                  : 'focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
              }`}
              disabled={loading}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <span className='text-sm text-red-500'>
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Phone Field with Auto-Format */}
          <div className='mb-3'>
            <label htmlFor='phone' className='block text-base text-gray-700'>
              Phone (optional)
            </label>
            <input
              id='phone'
              type='tel'
              value={phoneDisplay}
              onChange={handlePhoneChange}
              placeholder='(555) 123-4567'
              maxLength={14} // Formatted length: (123) 456-7890
              className={`mt-1 w-full rounded border p-1 transition-all duration-200 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } ${
                loading
                  ? 'cursor-not-allowed opacity-50'
                  : 'focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
              }`}
              disabled={loading}
              aria-invalid={errors.phone ? 'true' : 'false'}
            />
            {errors.phone && (
              <span className='text-sm text-red-500'>
                {errors.phone.message}
              </span>
            )}
            <span className='text-xs text-gray-500'>US phone numbers only</span>
          </div>

          {/* Message Field */}
          <div className='mb-3'>
            <label htmlFor='message' className='block text-base text-gray-700'>
              Message
            </label>
            <textarea
              id='message'
              {...register('message')}
              placeholder='Tell me about your project or inquiry...'
              className={`mt-1 w-full rounded border p-1 transition-all duration-200 ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              } ${
                loading
                  ? 'cursor-not-allowed opacity-50'
                  : 'focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
              }`}
              rows='4'
              disabled={loading}
              aria-invalid={errors.message ? 'true' : 'false'}
            />
            {errors.message && (
              <span className='text-sm text-red-500'>
                {errors.message.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className='flex justify-center'>
            <button
              type='submit'
              className={`w-full rounded-lg bg-emerald-950 p-3 font-medium text-white transition-all duration-200 ${
                loading
                  ? 'cursor-not-allowed opacity-50'
                  : 'hover:bg-emerald-900 hover:shadow-lg active:scale-95 active:transform'
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
    className='relative flex flex-col pb-24 pt-48 md:justify-center md:align-middle'
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

    <div className='flex flex-col justify-center px-4 py-12'>
      <div className='mx-20 flex justify-center text-3xl'>
        <ul className='flex gap-14'>
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
    </div>
    <div className='mx-auto mt-6 flex justify-center'>
      <Link
        href='/HarrisonDanielResume.pdf'
        target='_blank'
        className='flex flex-row items-center gap-2 rounded-md border border-black px-2 py-1 text-lg font-bold text-neutral-900 transition-transform hover:-translate-y-0.5'>
        <BiDownload />
        Resume
      </Link>
    </div>
  </div>
);

export default ContactFormWrapper;
