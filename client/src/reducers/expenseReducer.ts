import type { ExpenseState, ExpenseAction } from '@/types/index.ts';

export const initialState: ExpenseState = {
  expenses: [],
  filter:   { category: 'all' },
  search:   '',
  sort:     { field: 'expense_date', direction: 'desc' },
  loading:  false,
  error:    null,
};

/**
 * Pure function — given current state and an action, returns the next state.
 */
export function expenseReducer(state: ExpenseState, action: ExpenseAction): ExpenseState {
  switch (action.type) {

    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: [action.payload, ...state.expenses],
      };

    case 'EDIT_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map((e) =>
          e.id === action.payload.id ? { ...e, ...action.payload } : e
        ),
      };

    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter((e) => e.id !== action.payload.id),
      };

    case 'SET_FILTER':
      return { ...state, filter: action.payload };

    case 'SET_SEARCH':
      return { ...state, search: action.payload };

    case 'SET_SORT':
      return { ...state, sort: action.payload };

    case 'HYDRATE_FROM_STORAGE':
      return { ...state, expenses: action.payload };

    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    default:
      return state;
  }
}