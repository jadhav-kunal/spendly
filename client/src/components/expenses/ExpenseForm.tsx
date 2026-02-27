import React from 'react';
import { PlusCircle, Pencil, X } from 'lucide-react';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';
import { useExpenseContext } from '@/context/ExpenseContext.tsx';
import { useExpenseForm } from '@/hooks/useExpenseForm.ts';
import FieldError from '@/components/common/FieldError.tsx';
import { CATEGORIES } from '@/utils/constants.ts';
import type { Expense, ExpenseFormData } from '@/types/index.ts';

interface ExpenseFormProps {
  editingExpense?: Expense | null;
  onCancelEdit?:  () => void;
}

export default function ExpenseForm({
  editingExpense,
  onCancelEdit,
}: ExpenseFormProps): React.JSX.Element {
  const { addExpense, editExpense } = useExpenseContext();
  const {
    form,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    populateForm,
  } = useExpenseForm();

  const isEditing = Boolean(editingExpense);

  // Populate form when an expense is passed for editing
  React.useEffect(() => {
    if (editingExpense) {
      const formData: ExpenseFormData = {
        title:        editingExpense.title,
        description:  editingExpense.description ?? '',
        category:     editingExpense.category,
        amount:       String(editingExpense.amount),
        expense_date: editingExpense.expense_date,
      };
      populateForm(formData);
    } else {
      resetForm();
    }
  }, [editingExpense]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleSubmit(async (data) => {
      if (isEditing && editingExpense) {
        await editExpense(editingExpense.id, data);
        toast.success('Expense updated');
        onCancelEdit?.();
      } else {
        await addExpense(data);
        toast.success('Expense added');
        resetForm();
      }
    });
  }

  function onCancel() {
    resetForm();
    onCancelEdit?.();
  }

  return (
    <div className="card-elevated p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          {isEditing
            ? <Pencil size={16} className="text-accent" />
            : <PlusCircle size={16} className="text-accent" />
          }
          <h2 className="font-display font-semibold text-white text-sm">
            {isEditing ? 'Edit Expense' : 'Add Expense'}
          </h2>
        </div>
        {isEditing && (
          <button onClick={onCancel} className="btn-ghost p-1.5 rounded-lg">
            <X size={14} />
          </button>
        )}
      </div>

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">

        {/* Title */}
        <div>
          <label className="label">Title *</label>
          <input
            type="text"
            placeholder="e.g. Grocery run"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            onBlur={() => handleBlur('title')}
            className={clsx('input', touched.title && errors.title && 'input-error')}
          />
          <FieldError message={errors.title} visible={Boolean(touched.title)} />
        </div>

        {/* Amount */}
        <div>
          <label className="label">Amount (USD) *</label>
          <input
            type="number"
            placeholder="e.g. 45.23"
            value={form.amount}
            onChange={(e) => handleChange('amount', e.target.value)}
            onBlur={() => handleBlur('amount')}
            onKeyDown={(e) => {
              if (['e', 'E', '+', '-'].includes(e.key)) e.preventDefault();
            }}
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              if (input.value.includes('.')) {
                const parts = input.value.split('.');
                if (parts[1].length > 2) {
                  input.value = `${parts[0]}.${parts[1].slice(0, 2)}`;
                  handleChange('amount', input.value);
                }
              }
            }}
            min={0.01}
            step={0.01}
            className={clsx('input', touched.amount && errors.amount && 'input-error')}
          />
          <FieldError message={errors.amount} visible={Boolean(touched.amount)} />
        </div>

        {/* Category */}
        <div>
          <label className="label">Category *</label>
          <select
            value={form.category}
            onChange={(e) => handleChange('category', e.target.value)}
            onBlur={() => handleBlur('category')}
            className={clsx(
              'input',
              touched.category && errors.category && 'input-error',
              !form.category && 'text-muted'
            )}
          >
            <option value="" disabled>Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.emoji} {cat.label}
              </option>
            ))}
          </select>
          <FieldError message={errors.category} visible={Boolean(touched.category)} />
        </div>

        {/* Date */}
        <div>
          <label className="label">Date *</label>
          <input
            type="date"
            value={form.expense_date}
            onChange={(e) => handleChange('expense_date', e.target.value)}
            onBlur={() => handleBlur('expense_date')}
            max={new Date().toISOString().split('T')[0]}
            className={clsx(
              'input',
              '[color-scheme:dark]',
              touched.expense_date && errors.expense_date && 'input-error'
            )}
          />
          <FieldError message={errors.expense_date} visible={Boolean(touched.expense_date)} />
        </div>

        {/* Description */}
        <div>
          <label className="label">
            Description
            <span className="normal-case font-normal text-muted"> (optional)</span>
          </label>
          <textarea
            placeholder="Any extra details..."
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            onBlur={() => handleBlur('description')}
            rows={2}
            maxLength={420}
            className={clsx(
              'input resize-none',
              touched.description && errors.description && 'input-error'
            )}
          />
          <div className="flex items-center justify-between mt-1">
            <FieldError message={errors.description} visible={Boolean(touched.description)} />
            <span className={clsx(
              'text-xs ml-auto',
              form.description.length > 400 ? 'text-warning' : 'text-muted'
            )}>
              {form.description.length}/420
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button
            type="submit"
            disabled={touched.title !== undefined && !isValid}
            className="btn-primary flex-1"
          >
            {isEditing ? 'Update Expense' : 'Add Expense'}
          </button>
          {isEditing && (
            <button type="button" onClick={onCancel} className="btn-ghost">
              Cancel
            </button>
          )}
        </div>

      </form>
    </div>
  );
}