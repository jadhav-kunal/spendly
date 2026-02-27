import React from 'react';
import { AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';

interface FieldErrorProps {
  message?: string | null;
  visible:  boolean;
}

export default function FieldError({ message, visible }: FieldErrorProps): React.JSX.Element | null {
  if (!visible || !message) return null;
  return (
    <p className={clsx('flex items-center gap-1 text-xs text-danger mt-1 animate-fade-in')}>
      <AlertCircle size={12} />
      {message}
    </p>
  );
}