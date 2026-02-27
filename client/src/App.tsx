import React from 'react';
import { ExpenseProvider } from '@/context/ExpenseContext.tsx';
import AppShell from '@/components/layout/AppShell.tsx';
import Dashboard from '@/pages/Dashboard.tsx';
import ErrorBoundary from '@/components/common/ErrorBoundary.tsx';

export default function App(): React.JSX.Element {
  return (
    <ErrorBoundary>
      <ExpenseProvider>
        <AppShell>
          <Dashboard />
        </AppShell>
      </ExpenseProvider>
    </ErrorBoundary>
  );
}