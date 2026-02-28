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
        <span>Built by </span>
        <a
          href="https://kunalkunal.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent-glow transition-colors font-semibold"
        >
          Kunal
        </a>
        <span className="mx-1">—</span>
        <a
          href="https://kunalkunal.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors underline underline-offset-2"
        >
          know more about me!
        </a>
      </footer>
    </div>
  );
}