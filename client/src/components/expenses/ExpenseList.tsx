import React, { memo } from 'react';
import toast from 'react-hot-toast';
import { useExpenseContext } from '@/context/ExpenseContext.tsx';
import { useConfirm } from '@/hooks/useConfirm.ts';
import ExpenseCard from './ExpenseCard.tsx';
import EmptyState from '@/components/common/EmptyState.tsx';
import type { Expense } from '@/types/index.ts';

interface ExpenseListProps {
  onEdit: (expense: Expense) => void;
}

const ExpenseList = memo(function ExpenseList({ onEdit }: ExpenseListProps): React.JSX.Element {
  const { filteredExpenses, state, deleteExpense } = useExpenseContext();
  const { isConfirming, requestConfirm, cancelConfirm } = useConfirm();

  const isFiltered =
    state.filter.category !== 'all' || state.search.trim() !== '';

  function handleDeleteConfirm(id: string) {
    deleteExpense(id);
    cancelConfirm();
    toast.success('Expense deleted');
  }

  if (filteredExpenses.length === 0) {
    return (
      <div className="card-elevated">
        <EmptyState filtered={isFiltered} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {filteredExpenses.map((expense) => (
        <ExpenseCard
          key={expense.id}
          expense={expense}
          isConfirming={isConfirming(expense.id)}
          onEdit={onEdit}
          onDeleteRequest={requestConfirm}
          onDeleteConfirm={handleDeleteConfirm}
          onDeleteCancel={cancelConfirm}
        />
      ))}
    </div>
  );
});

export default ExpenseList;