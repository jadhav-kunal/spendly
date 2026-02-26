import React from 'react';
import { ExpenseProvider } from '@/context/ExpenseContext.tsx';
import AppShell from '@/components/layout/AppShell.tsx';
import Dashboard from '@/pages/Dashboard.tsx';

export default function App(): React.JSX.Element {
  return (
    <ExpenseProvider>
      <AppShell>
        <Dashboard />
      </AppShell>
    </ExpenseProvider>
  );
}