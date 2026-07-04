import { z } from 'zod';

export const contactMessageSchema = z.object({
  name: z.string().trim().min(2, 'Name is too short').max(100),
  email: z.string().trim().email('Enter a valid email address'),
  message: z.string().trim().min(10, 'Message is too short').max(2000),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
