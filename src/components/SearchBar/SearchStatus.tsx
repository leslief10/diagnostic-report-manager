import type { SearchStatusProps } from '@/types';

export function SearchStatus({ searchQuery }: SearchStatusProps) {
  const trimmedQuery = searchQuery.trim();

  return (
    <div role="status" aria-live="polite" className="sr-only">
      {trimmedQuery && `Searching for: ${searchQuery}`}
    </div>
  );
}
