import React, { createContext, useContext } from 'react';

const ExpenseContext = createContext<unknown>(null);

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  return (
    <ExpenseContext.Provider value={{}}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenseContext(): unknown {
  const ctx = useContext(ExpenseContext);
  if (!ctx) throw new Error('useExpenseContext must be used inside ExpenseProvider');
  return ctx;
}