import { z } from 'zod'

// Login validation schema
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type LoginInput = z.infer<typeof loginSchema>

// Register validation schema
export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export type RegisterInput = z.infer<typeof registerSchema>

// Event validation schema
export const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  date: z.string().min(1, 'Date is required'),
  location: z.string().optional(),
  capacity: z.number().int().positive().optional().or(z.string().transform((val) => {
    const num = parseInt(val, 10)
    return isNaN(num) ? undefined : num
  })),
  imageUrl: z.string().url().optional().or(z.literal('')),
})

export type EventInput = z.infer<typeof eventSchema>
export type EventFormInput = z.input<typeof eventSchema>

// RSVP validation schema
export const rsvpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  status: z.enum(['PENDING', 'CONFIRMED', 'DECLINED']).default('CONFIRMED'),
})

export type RSVPInput = z.infer<typeof rsvpSchema>
export type RSVPFormInput = z.input<typeof rsvpSchema>
