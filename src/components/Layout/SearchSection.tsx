import type { SearchSectionProps } from '@/types';

export function SearchSection({ onSearch }: SearchSectionProps) {
  console.log(onSearch); // to be removed
  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Search Reports</h2>
    </section>
  );
}
