import type { ExpenseState, ExpenseAction } from '@/types/index.ts';

export const initialState: ExpenseState = {
  expenses: [],
  filter:   { category: 'all' },
  search:   '',
  sort:     { field: 'expense_date', direction: 'desc' },
  loading:  false,
  error:    null,
};

export function expenseReducer(state: ExpenseState, action: ExpenseAction): ExpenseState {
  return state;
}