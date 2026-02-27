// ─── Domain Types ─────────────────────────────────────────────────────────────

export interface Expense {
  id: string;
  userId: string;
  title: string;
  description?: string;
  category: ExpenseCategory;
  amount: number;
  expense_date: string;
  createdAt: string;
  updatedAt: string;
}

export type ExpenseCategory =
  | 'food'
  | 'transport'
  | 'shopping'
  | 'entertainment'
  | 'health'
  | 'utilities'
  | 'education'
  | 'travel'
  | 'other';

// ─── Form Types ───────────────────────────────────────────────────────────────

export interface ExpenseFormData {
  title: string;
  description: string;
  category: ExpenseCategory | '';
  amount: string;
  expense_date: string;
}

export type FormErrors = Partial<Record<keyof ExpenseFormData, string | null>>;

// ─── State Types ──────────────────────────────────────────────────────────────

export interface SortConfig {
  field: 'expense_date' | 'amount';
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  category: ExpenseCategory | 'all';
}

export interface ExpenseState {
  expenses: Expense[];
  filter: FilterConfig;
  search: string;
  sort: SortConfig;
  loading: boolean;
  error: string | null;
}

// ─── Reducer Action Types ─────────────────────────────────────────────────────

export type ExpenseAction =
  | { type: 'ADD_EXPENSE';          payload: Expense }
  | { type: 'EDIT_EXPENSE';         payload: Expense }
  | { type: 'DELETE_EXPENSE';       payload: { id: string } }
  | { type: 'SET_FILTER';           payload: FilterConfig }
  | { type: 'SET_SEARCH';           payload: string }
  | { type: 'SET_SORT';             payload: SortConfig }
  | { type: 'HYDRATE_FROM_STORAGE'; payload: Expense[] }
  | { type: 'SET_LOADING';          payload: boolean }
  | { type: 'SET_ERROR';            payload: string | null };

// ─── Context Type ─────────────────────────────────────────────────────────────

export interface ExpenseContextValue {
  state:            ExpenseState;
  addExpense:       (data: ExpenseFormData) => Promise<void>;
  editExpense:      (id: string, data: ExpenseFormData) => Promise<void>;
  deleteExpense:    (id: string) => Promise<void>;
  setFilter:        (filter: FilterConfig) => void;
  setSearch:        (search: string) => void;
  setSort:          (sort: SortConfig) => void;
  filteredExpenses: Expense[];
  totalSpent:       number;
  monthlySpent:     number;
  categoryCount:    number;
  isLoading:        boolean;
}

// ─── API Types ────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

// ─── UI / Utility Types ───────────────────────────────────────────────────────

export interface CategoryMeta {
  value: ExpenseCategory;
  label: string;
  color: string;
  emoji: string;
}

export interface SortOption {
  value: string;
  label: string;
  field: SortConfig['field'];
  direction: SortConfig['direction'];
}