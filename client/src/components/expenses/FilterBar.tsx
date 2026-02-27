import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { clsx } from 'clsx';
import { useExpenseContext } from '@/context/ExpenseContext.tsx';
import SearchInput from '@/components/common/SearchInput.tsx';
import { CATEGORIES, SORT_OPTIONS } from '@/utils/constants.ts';
import type { ExpenseCategory } from '@/types/index.ts';

export default function FilterBar(): React.JSX.Element {
  const { state, setFilter, setSearch, setSort, filteredExpenses } = useExpenseContext();

  const currentSortValue = SORT_OPTIONS.find(
    (o) => o.field === state.sort.field && o.direction === state.sort.direction
  )?.value ?? 'date_desc';

  function handleSortChange(value: string) {
    const option = SORT_OPTIONS.find((o) => o.value === value);
    if (option) setSort({ field: option.field, direction: option.direction });
  }

  function handleCategoryChange(category: ExpenseCategory | 'all') {
    setFilter({ category });
  }

  const hasActiveFilters =
    state.filter.category !== 'all' ||
    state.search.trim() !== '' ||
    currentSortValue !== 'date_desc';

  return (
    <div className="flex flex-col gap-3 mb-4">

      {/* Row 1 — search + sort */}
      <div className="flex gap-2">
        <div className="flex-1">
          <SearchInput
            value={state.search}
            onChange={setSearch}
          />
        </div>
        <select
          value={currentSortValue}
          onChange={(e) => handleSortChange(e.target.value)}
          className="input w-auto text-xs px-3 cursor-pointer"
          aria-label="Sort expenses"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Row 2 — category pills */}
      <div className="flex items-center gap-2 flex-wrap">
        <SlidersHorizontal size={13} className="text-muted shrink-0" />

        <button
          onClick={() => handleCategoryChange('all')}
          className={clsx(
            'px-3 py-1 rounded-lg text-xs font-display font-semibold transition-all duration-150',
            state.filter.category === 'all'
              ? 'bg-accent text-white shadow-neo-sm'
              : 'bg-surface-3 text-muted hover:text-white border border-border'
          )}
        >
          All
        </button>

        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleCategoryChange(cat.value)}
            className={clsx(
              'px-3 py-1 rounded-lg text-xs font-display font-semibold transition-all duration-150 flex items-center gap-1',
              state.filter.category === cat.value
                ? 'text-white shadow-neo-sm'
                : 'bg-surface-3 text-muted hover:text-white border border-border'
            )}
            style={
              state.filter.category === cat.value
                ? { backgroundColor: cat.color, boxShadow: `2px 2px 0px 0px ${cat.color}80` }
                : {}
            }
          >
            <span>{cat.emoji}</span>
            <span className="hidden sm:inline">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Row 3 — results count + clear */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted">
          {filteredExpenses.length === 0
            ? 'No results'
            : `${filteredExpenses.length} expense${filteredExpenses.length === 1 ? '' : 's'}`}
        </p>
        {hasActiveFilters && (
          <button
            onClick={() => {
              setFilter({ category: 'all' });
              setSearch('');
              setSort({ field: 'expense_date', direction: 'desc' });
            }}
            className="text-xs text-accent hover:text-accent-glow transition-colors font-display font-semibold"
          >
            Clear filters
          </button>
        )}
      </div>

    </div>
  );
}