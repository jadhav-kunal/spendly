import { useReducer, useMemo, useEffect } from 'react';
import { expenseReducer, initialState } from '@/reducers/expenseReducer.ts';
import { expenseService } from '@/services/expenseService.ts';
import { normalizeExpense, normalizeExpenses } from '@/utils/normalizers.ts';
import type {
  ExpenseFormData,
  FilterConfig,
  SortConfig,
  ExpenseContextValue,
  Expense,
} from '@/types/index.ts';

export function useExpenses(): ExpenseContextValue {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  // Fetch all expenses on mount
  useEffect(() => {
    async function fetchExpenses() {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const res = await expenseService.getAll();
        const normalized = normalizeExpenses(
          res.data.data as Record<string, unknown>[]
        );
        dispatch({ type: 'HYDRATE_FROM_STORAGE', payload: normalized });
      } catch (err) {
        dispatch({
          type: 'SET_ERROR',
          payload: err instanceof Error ? err.message : 'Failed to load expenses',
        });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }

    fetchExpenses();
  }, []);

  // Surface reducer errors as toasts
  useEffect(() => {
    if (state.error) {
      import('react-hot-toast').then(({ default: toast }) => {
        toast.error(state.error!);
      });
      dispatch({ type: 'SET_ERROR', payload: null });
    }
  }, [state.error]);

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
        return (
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      })
      .reduce((sum, e) => sum + e.amount, 0);
  }, [state.expenses]);

  const categoryCount = useMemo(
    () => new Set(state.expenses.map((e) => e.category)).size,
    [state.expenses]
  );

  // ─── Action creators ────────────────────────────────────────────────────────

  async function addExpense(data: ExpenseFormData): Promise<void> {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const payload = {
        ...data,
        amount: parseFloat(parseFloat(data.amount).toFixed(2)),
      };
      const res = await expenseService.create(payload as unknown as ExpenseFormData);
      const normalized = normalizeExpense(
        res.data.data as unknown as Record<string, unknown>
      );
      dispatch({ type: 'ADD_EXPENSE', payload: normalized });
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        payload: err instanceof Error ? err.message : 'Failed to add expense',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }

  async function editExpense(id: string, data: ExpenseFormData): Promise<void> {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const payload = {
        ...data,
        amount: parseFloat(parseFloat(data.amount).toFixed(2)),
      };
      const res = await expenseService.update(id, payload as unknown as Partial<ExpenseFormData>);
      const normalized = normalizeExpense(
        res.data.data as unknown as Record<string, unknown>
      );
      dispatch({ type: 'EDIT_EXPENSE', payload: normalized });
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        payload: err instanceof Error ? err.message : 'Failed to update expense',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }

  async function deleteExpense(id: string): Promise<void> {
    dispatch({ type: 'DELETE_EXPENSE', payload: { id } });
    try {
      await expenseService.remove(id);
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        payload: err instanceof Error ? err.message : 'Failed to delete expense',
      });
    }
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
    isLoading: state.loading,
  };
}