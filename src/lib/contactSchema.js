import * as z from 'zod';

export const contactSchema = z.object({
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
