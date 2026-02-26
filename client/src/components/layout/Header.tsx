import React from 'react';
import { Wallet } from 'lucide-react';

export default function Header(): React.JSX.Element {
  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center shadow-glow">
              <Wallet size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-white">
              Spendly
            </span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-surface-2 border border-border">
            <span className="text-xs font-display font-semibold text-muted tracking-wider">
              DASHBOARD
            </span>
          </div>

        </div>
      </div>
    </header>
  );
}