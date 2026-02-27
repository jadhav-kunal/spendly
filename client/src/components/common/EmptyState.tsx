import React from 'react';
import { Receipt, SearchX } from 'lucide-react';

interface EmptyStateProps {
  title?:    string;
  subtitle?: string;
  filtered?: boolean;
}

export default function EmptyState({
  title,
  subtitle,
  filtered = false,
}: EmptyStateProps): React.JSX.Element {
  const defaultTitle    = filtered ? 'No results found'              : 'No expenses yet';
  const defaultSubtitle = filtered ? 'Try adjusting your filters.'   : 'Add your first expense using the form.';
  const Icon            = filtered ? SearchX                         : Receipt;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-14 h-14 rounded-2xl bg-surface-3 border border-border flex items-center justify-center mb-4">
        <Icon size={24} className="text-muted" />
      </div>
      <p className="font-display font-semibold text-white text-sm">
        {title ?? defaultTitle}
      </p>
      <p className="text-muted text-xs mt-1 max-w-[200px]">
        {subtitle ?? defaultSubtitle}
      </p>
    </div>
  );
}