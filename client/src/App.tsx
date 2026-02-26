import React from 'react';
import AppShell from '@/components/layout/AppShell.tsx';
import Dashboard from '@/pages/Dashboard.tsx';

export default function App(): React.JSX.Element {
  return (
    <AppShell>
      <Dashboard />
    </AppShell>
  );
}