import type { CategoryMeta, SortOption, ExpenseCategory } from '@/types/index.ts';

export const CATEGORIES: CategoryMeta[] = [
  { value: 'food',          label: 'Food & Dining',    color: '#F59E0B', emoji: '🍔' },
  { value: 'transport',     label: 'Transport',         color: '#3B82F6', emoji: '🚗' },
  { value: 'shopping',      label: 'Shopping',          color: '#EC4899', emoji: '🛍️' },
  { value: 'entertainment', label: 'Entertainment',     color: '#8B5CF6', emoji: '🎬' },
  { value: 'health',        label: 'Health & Medical',  color: '#10B981', emoji: '💊' },
  { value: 'utilities',     label: 'Utilities & Bills', color: '#6B7280', emoji: '💡' },
  { value: 'education',     label: 'Education',         color: '#0EA5E9', emoji: '📚' },
  { value: 'travel',        label: 'Travel',            color: '#14B8A6', emoji: '✈️' },
  { value: 'other',         label: 'Other',             color: '#A3A3A3', emoji: '📦' },
];

export const SORT_OPTIONS: SortOption[] = [
  { value: 'date_desc',   label: 'Newest First',   field: 'expense_date', direction: 'desc' },
  { value: 'date_asc',    label: 'Oldest First',   field: 'expense_date', direction: 'asc'  },
  { value: 'amount_desc', label: 'Highest Amount', field: 'amount',       direction: 'desc' },
  { value: 'amount_asc',  label: 'Lowest Amount',  field: 'amount',       direction: 'asc'  },
];

export const DEFAULT_SORT = 'date_desc';

export function getCategoryMeta(value: ExpenseCategory | string): CategoryMeta {
  return CATEGORIES.find((c) => c.value === value) ?? CATEGORIES[CATEGORIES.length - 1];
}