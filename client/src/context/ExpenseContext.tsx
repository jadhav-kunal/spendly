import React, { createContext, useContext } from 'react';
import { useExpenses } from '@/hooks/useExpenses.ts';
import type { ExpenseContextValue } from '@/types/index.ts';

const ExpenseContext = createContext<ExpenseContextValue | null>(null);

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const value = useExpenses();
  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
}

/**
 * useExpenseContext — typed context consumer hook.
 * Throws if used outside the provider, making misuse a compile + runtime error.
 */
export function useExpenseContext(): ExpenseContextValue {
  const ctx = useContext(ExpenseContext);
  if (!ctx) throw new Error('useExpenseContext must be used inside ExpenseProvider');
  return ctx;
}