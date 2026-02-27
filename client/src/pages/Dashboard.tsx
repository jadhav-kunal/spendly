import React, { useState } from 'react';
import { useExpenseContext } from '@/context/ExpenseContext.tsx';
import { formatCurrency } from '@/utils/formatters.ts';
import ExpenseForm from '@/components/expenses/ExpenseForm.tsx';
import type { Expense } from '@/types/index.ts';

export default function Dashboard(): React.JSX.Element {
  const { totalSpent, monthlySpent, categoryCount } = useExpenseContext();
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const stats = [
    { label: 'Total Spent',  value: formatCurrency(totalSpent)   },
    { label: 'This Month',   value: formatCurrency(monthlySpent) },
    { label: 'Categories',   value: String(categoryCount)        },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-white tracking-tight">
          Your <span className="text-gradient">Expenses</span>
        </h1>
        <p className="text-muted text-sm mt-1 font-body">
          Track, manage, and understand where your money goes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Live stats */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="card-elevated p-5 animate-slide-up">
              <p className="label">{stat.label}</p>
              <p className="font-display font-bold text-2xl text-white mt-1">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="lg:col-span-1">
          <ExpenseForm
            editingExpense={editingExpense}
            onCancelEdit={() => setEditingExpense(null)}
          />
        </div>

        {/* List region */}
        <div className="lg:col-span-2">
          <div className="card-elevated p-5 min-h-[300px] flex items-center justify-center">
            <p className="text-muted text-sm font-display tracking-wider">LIST</p>
          </div>
        </div>

      </div>
    </div>
  );
}