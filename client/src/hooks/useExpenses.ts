import { useReducer, useMemo, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { expenseReducer, initialState } from '@/reducers/expenseReducer.ts';
import type {
  ExpenseFormData,
  FilterConfig,
  SortConfig,
  ExpenseContextValue,
  Expense,
} from '@/types/index.ts';

const STORAGE_KEY = 'spendly:expenses';

export function useExpenses(): ExpenseContextValue {
  const [state, dispatch] = useReducer(expenseReducer, initialState);
  const isHydrated = useRef(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Expense[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          dispatch({ type: 'HYDRATE_FROM_STORAGE', payload: parsed });
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Persist on every expenses change — skip the initial empty render
  // to prevent overwriting stored data before hydration runs
  useEffect(() => {
    if (!isHydrated.current) {
      isHydrated.current = true;
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.expenses));
    } catch {
      // Storage quota exceeded — fail silently
    }
  }, [state.expenses]);

  // ─── Derived state ──────────────────────────────────────────────────────────

  const filteredExpenses = useMemo(() => {
    let result = [...state.expenses];

    if (state.filter.category !== 'all') {
      result = result.filter((e) => e.category === state.filter.category);
    }

    if (state.search.trim()) {
      const term = state.search.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(term) ||
          e.description?.toLowerCase().includes(term)
      );
    }

    result.sort((a, b) => {
      const { field, direction } = state.sort;
      let aVal: number;
      let bVal: number;

      if (field === 'expense_date') {
        aVal = new Date(a.expense_date).getTime();
        bVal = new Date(b.expense_date).getTime();
      } else {
        aVal = a.amount;
        bVal = b.amount;
      }

      return direction === 'asc' ? aVal - bVal : bVal - aVal;
    });

    return result;
  }, [state.expenses, state.filter, state.search, state.sort]);

  const totalSpent = useMemo(
    () => state.expenses.reduce((sum, e) => sum + e.amount, 0),
    [state.expenses]
  );

  const monthlySpent = useMemo(() => {
    const now = new Date();
    return state.expenses
      .filter((e) => {
        const d = new Date(e.expense_date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      })
      .reduce((sum, e) => sum + e.amount, 0);
  }, [state.expenses]);

  const categoryCount = useMemo(
    () => new Set(state.expenses.map((e) => e.category)).size,
    [state.expenses]
  );

  // ─── Action creators ────────────────────────────────────────────────────────

  function addExpense(data: ExpenseFormData): void {
    const now = new Date().toISOString();
    const expense: Expense = {
      id:           uuidv4(),
      userId:       'local-user',
      title:        data.title.trim(),
      description:  data.description.trim() || undefined,
      category:     data.category as Expense['category'],
      amount:       parseFloat(parseFloat(data.amount).toFixed(2)),
      expense_date: data.expense_date,
      createdAt:    now,
      updatedAt:    now,
    };
    dispatch({ type: 'ADD_EXPENSE', payload: expense });
  }

  function editExpense(id: string, data: ExpenseFormData): void {
    const existing = state.expenses.find((e) => e.id === id);
    if (!existing) return;
    const updated: Expense = {
      ...existing,
      title:        data.title.trim(),
      description:  data.description.trim() || undefined,
      category:     data.category as Expense['category'],
      amount:       parseFloat(parseFloat(data.amount).toFixed(2)),
      expense_date: data.expense_date,
      updatedAt:    new Date().toISOString(),
    };
    dispatch({ type: 'EDIT_EXPENSE', payload: updated });
  }

  function deleteExpense(id: string): void {
    dispatch({ type: 'DELETE_EXPENSE', payload: { id } });
  }

  function setFilter(filter: FilterConfig): void {
    dispatch({ type: 'SET_FILTER', payload: filter });
  }

  function setSearch(search: string): void {
    dispatch({ type: 'SET_SEARCH', payload: search });
  }

  function setSort(sort: SortConfig): void {
    dispatch({ type: 'SET_SORT', payload: sort });
  }

  return {
    state,
    addExpense,
    editExpense,
    deleteExpense,
    setFilter,
    setSearch,
    setSort,
    filteredExpenses,
    totalSpent,
    monthlySpent,
    categoryCount,
  };
}