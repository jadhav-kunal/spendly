import type { Expense } from '@/types/index.ts';

/**
 * Normalizes a raw API expense response into the shape the frontend expects.
 */
export function normalizeExpense(raw: Record<string, unknown>): Expense {
  return {
    id:           raw.id as string,
    userId:       raw.userId as string,
    title:        raw.title as string,
    description:  raw.description as string | undefined,
    category:     raw.category as Expense['category'],
    amount:       parseFloat(raw.amount as string),
    expense_date: (raw.expenseDate as string).split('T')[0],
    createdAt:    raw.createdAt as string,
    updatedAt:    raw.updatedAt as string,
  };
}

export function normalizeExpenses(raw: Record<string, unknown>[]): Expense[] {
  return raw.map(normalizeExpense);
}