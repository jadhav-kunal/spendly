import type { ExpenseFormData, FormErrors } from '@/types/index.ts';

export function validateTitle(value: string): string | null {
  if (!value?.trim()) return 'Title is required';
  if (value.trim().length < 2) return 'Min 2 characters';
  if (value.trim().length > 100) return 'Max 100 characters';
  return null;
}

export function validateAmount(value: string | number): string | null {
  if (value === '' || value === null || value === undefined) return 'Amount is required';
  const num = Number(value);
  if (isNaN(num) || num <= 0) return 'Must be a positive number';
  if (Math.round(num * 100) / 100 !== parseFloat(num.toFixed(2))) return 'Max 2 decimal places';
  if (num > 10_000_000) return 'Amount is too large';
  return null;
}

export function validateCategory(value: string): string | null {
  if (!value) return 'Category is required';
  return null;
}

export function validateDate(value: string): string | null {
  if (!value) return 'Date is required';
  if (isNaN(new Date(value).getTime())) return 'Invalid date';
  return null;
}

export function validateDescription(value: string): string | null {
  if (value.length > 420) return 'Description must be under 420 characters';
  return null;
}

export function validateExpenseForm(form: ExpenseFormData): {
  errors: FormErrors;
  isValid: boolean;
} {
  const errors: FormErrors = {
    title:        validateTitle(form.title),
    amount:       validateAmount(form.amount),
    category:     validateCategory(form.category),
    expense_date: validateDate(form.expense_date),
    description:  validateDescription(form.description),
  };
  return {
    errors,
    isValid: Object.values(errors).every((e) => e === null),
  };
}