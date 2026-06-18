import { z } from 'zod';

// Shared Zod schema — imported by the client form AND the serverless handler
// so validation rules can never drift between the two. Length caps prevent
// oversized payloads / abuse; trims normalise whitespace.

export const PACKAGE_OPTIONS = [
  'Mate', 'Pirate', 'Captain', 'Wing Pirate Week', 'Wing Captain Week',
  'Lost Sailor', 'First Mate', 'Full Sail', 'Free Pirate',
  'Wing Taster', 'Wing Starter', 'Wing Rider',
  'Golden Hour', 'Downwind Run', 'Island Trip', 'Horse Riding',
  'Snorkeling', 'Orange Bay', "Pirate's Night",
];

export const bookingSchema = z.object({
  // Honeypot — must stay empty. Real users never see/fill it; bots usually do.
  company: z.string().max(0).optional().or(z.literal('')),

  fullName: z.string().trim().min(2, 'required').max(80, 'tooLong'),
  email: z.string().trim().email('invalidEmail').max(120),
  whatsapp: z
    .string()
    .trim()
    .min(6, 'invalidPhone')
    .max(30)
    .regex(/^[+()\d\s-]+$/, 'invalidPhone'),
  nationality: z.string().trim().min(2, 'required').max(60),
  language: z.enum(['English', 'German', 'French', 'Russian', 'Arabic', 'Italian']).optional(),
  bookingType: z.enum(['Pirates Week', 'Standalone Course', 'Day Experience']).optional(),
  package: z.enum(PACKAGE_OPTIONS).optional(),
  arrivalDate: z.string().trim().min(1, 'required').max(20),
  guests: z.coerce.number().int().min(1).max(10).optional(),
  experience: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Non-kiter']).optional(),
  ownEquipment: z.enum(['Yes', 'No']).optional(),
  medical: z.string().trim().max(1000, 'tooLong').optional().or(z.literal('')),
  referral: z.enum(['Instagram', 'TikTok', 'Facebook', 'Google', 'Friend', 'Other']).optional(),
  message: z.string().trim().max(2000, 'tooLong').optional().or(z.literal('')),
  consent: z.literal(true, { errorMap: () => ({ message: 'consentRequired' }) }),
});
