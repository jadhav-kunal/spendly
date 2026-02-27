import { z } from 'zod';

const VALID_CATEGORIES = [
  'food',
  'transport',
  'shopping',
  'entertainment',
  'health',
  'utilities',
  'education',
  'travel',
  'other',
];

export const createExpenseSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .trim()
    .min(2, 'Title must be at least 2 characters')
    .max(100, 'Title must be under 100 characters'),

  description: z
    .string()
    .max(420, 'Description must be under 420 characters')
    .optional()
    .nullable(),

  category: z.enum(VALID_CATEGORIES, {
    errorMap: () => ({ message: 'Invalid category' }),
  }),

  amount: z
    .number({ required_error: 'Amount is required', invalid_type_error: 'Amount must be a number' })
    .positive('Amount must be greater than 0')
    .max(10_000_000, 'Amount is too large')
    .refine(
      (val) => Math.round(val * 100) / 100 === parseFloat(val.toFixed(2)),
      'Max 2 decimal places'
    ),

  expense_date: z
    .string({ required_error: 'Date is required' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
});

export const updateExpenseSchema = createExpenseSchema.partial();

export const uuidSchema = z.string().uuid('Invalid expense ID');