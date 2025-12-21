import { SearchInput } from '@/components/ui/Input/SearchInput';
import { useSearch } from '@/hooks/useSearch';
import { SearchStatus } from './SearchStatus';
import type { SearchBarProps } from '@/types';

export function SearchBar({ onSearch, placeholder = 'Search reports by name...' }: SearchBarProps) {
  const { value, onValueChange, onClear } = useSearch({ onSearch });

  return (
    <div className="w-full">
      <SearchInput
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        onClear={onClear}
        placeholder={placeholder}
        aria-label="Search reports"
        fullWidth
      />

      <SearchStatus searchQuery={value} />
    </div>
  );
}
