import React from 'react';

export default function StatCardSkeleton(): React.JSX.Element {
  return (
    <div className="card-elevated p-5 animate-pulse">
      <div className="h-3 w-20 bg-surface-4 rounded-lg mb-3" />
      <div className="h-7 w-28 bg-surface-3 rounded-lg" />
    </div>
  );
}