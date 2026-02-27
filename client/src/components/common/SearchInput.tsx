import React, { useRef } from 'react';
import { Search, X } from 'lucide-react';
import { clsx } from 'clsx';

interface SearchInputProps {
  value:    string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search expenses...',
}: SearchInputProps): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClear() {
    onChange('');
    inputRef.current?.focus();
  }

  return (
    <div className="relative flex items-center">
      <Search
        size={15}
        className="absolute left-3 text-muted pointer-events-none shrink-0"
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={clsx(
          'input pl-9 pr-8',
          value && 'border-accent/40'
        )}
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 text-muted hover:text-white transition-colors"
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}