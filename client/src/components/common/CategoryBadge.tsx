import React from 'react';
import { getCategoryMeta } from '@/utils/constants.ts';
import type { ExpenseCategory } from '@/types/index.ts';

interface CategoryBadgeProps {
  category: ExpenseCategory | string;
  showLabel?: boolean;
}

export default function CategoryBadge({
  category,
  showLabel = true,
}: CategoryBadgeProps): React.JSX.Element {
  const meta = getCategoryMeta(category);

  return (
    <span
      className="badge"
      style={{
        backgroundColor: `${meta.color}18`,
        color: meta.color,
        border: `1px solid ${meta.color}30`,
      }}
    >
      <span>{meta.emoji}</span>
      {showLabel && <span>{meta.label}</span>}
    </span>
  );
}