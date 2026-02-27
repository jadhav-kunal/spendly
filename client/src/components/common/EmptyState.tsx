import React from 'react';
import { Receipt } from 'lucide-react';

interface EmptyStateProps {
  title?:    string;
  subtitle?: string;
}

export default function EmptyState({
  title    = 'No expenses yet',
  subtitle = 'Add your first expense using the form.',
}: EmptyStateProps): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-14 h-14 rounded-2xl bg-surface-3 border border-border flex items-center justify-center mb-4">
        <Receipt size={24} className="text-muted" />
      </div>
      <p className="font-display font-semibold text-white text-sm">{title}</p>
      <p className="text-muted text-xs mt-1 max-w-[200px]">{subtitle}</p>
    </div>
  );
}