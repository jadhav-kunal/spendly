import React, { memo } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { clsx } from 'clsx';
import { formatCurrency, formatDate } from '@/utils/formatters.ts';
import type { Expense } from '@/types/index.ts';

interface ExpenseCardProps {
  expense:        Expense;
  isConfirming:   boolean;
  onEdit:         (expense: Expense) => void;
  onDeleteRequest:(id: string) => void;
  onDeleteConfirm:(id: string) => void;
  onDeleteCancel: () => void;
}

/**
 * Memoized — only re-renders when its own expense or confirm state changes.
 * Keeps the list performant as it grows.
 */
const ExpenseCard = memo(function ExpenseCard({
  expense,
  isConfirming,
  onEdit,
  onDeleteRequest,
  onDeleteConfirm,
  onDeleteCancel,
}: ExpenseCardProps): React.JSX.Element {
  return (
    <div
      className={clsx(
        'group flex items-start gap-3 p-4 rounded-2xl border transition-all duration-150',
        isConfirming
          ? 'bg-danger/5 border-danger/40'
          : 'bg-surface-2 border-border hover:border-accent/30 hover:bg-surface-3'
      )}
    >
      {/* Category icon */}
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-base"
        style={{ backgroundColor: `${getCategoryColor(expense.category)}18` }}
      >
        {getCategoryEmoji(expense.category)}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-display font-semibold text-sm text-white truncate">
              {expense.title}
            </p>
            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
              <span className="text-xs text-muted">{formatDate(expense.expense_date)}</span>
            </div>
            {expense.description && (
              <p className="text-xs text-muted mt-1 line-clamp-2">{expense.description}</p>
            )}
          </div>

          {/* Amount */}
          <span className="font-mono font-semibold text-sm text-white shrink-0">
            {formatCurrency(expense.amount)}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-1 mt-2">
          {isConfirming ? (
            <>
              <span className="text-xs text-danger mr-2 font-display">Delete?</span>
              <button
                onClick={() => onDeleteConfirm(expense.id)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-danger text-white text-xs font-display font-semibold hover:bg-danger/80 transition-colors"
              >
                <Check size={12} /> Yes
              </button>
              <button
                onClick={onDeleteCancel}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-4 text-white text-xs font-display font-semibold hover:bg-surface-4/80 transition-colors"
              >
                <X size={12} /> No
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onEdit(expense)}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-muted hover:text-accent hover:bg-accent/10 transition-all"
                aria-label="Edit expense"
              >
                <Pencil size={13} />
              </button>
              <button
                onClick={() => onDeleteRequest(expense.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-muted hover:text-danger hover:bg-danger/10 transition-all"
                aria-label="Delete expense"
              >
                <Trash2 size={13} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default ExpenseCard;

// ─── Helpers (avoids importing full constants just for emoji/color) ────────────

import { getCategoryMeta } from '@/utils/constants.ts';

function getCategoryEmoji(category: string): string {
  return getCategoryMeta(category).emoji;
}

function getCategoryColor(category: string): string {
  return getCategoryMeta(category).color;
}