import { SearchBar } from '@/components/SearchBar';
import type { SearchSectionProps } from '@/types';

export function SearchSection({ onSearch }: SearchSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Search Reports</h2>
      <SearchBar onSearch={onSearch} />
    </div>
  );
}
