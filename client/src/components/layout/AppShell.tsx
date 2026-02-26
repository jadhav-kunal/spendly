import React from 'react';
import Header from './Header';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps): React.JSX.Element {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="py-4 text-center text-xs text-muted border-t border-border">
        <span className="font-display tracking-wider">SPENDLY</span>
        <span className="mx-2 text-surface-4">·</span>
        <span>Track every dollar</span>
      </footer>
    </div>
  );
}