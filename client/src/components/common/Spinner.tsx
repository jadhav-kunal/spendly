import React from 'react';
import { clsx } from 'clsx';

interface SpinnerProps {
  size?:  'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm:  'w-4 h-4 border-2',
  md:  'w-7 h-7 border-2',
  lg:  'w-10 h-10 border-[3px]',
};

export default function Spinner({ size = 'md', className }: SpinnerProps): React.JSX.Element {
  return (
    <div
      className={clsx(
        'rounded-full border-surface-4 border-t-accent animate-spin',
        sizeMap[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
}