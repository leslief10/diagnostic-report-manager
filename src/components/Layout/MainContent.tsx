import { ErrorSection } from './ErrorSection';
import { SearchSection } from './SearchSection';
import { ReportsSection } from './ReportsSection';
import type { MainContentProps } from '@/types';

export function MainContent({ error, onDismissError, onSearch }: MainContentProps) {
  return (
    <div className="lg:col-span-2">
      <div className="space-y-6">
        <ErrorSection error={error} onDismiss={onDismissError} />
        <SearchSection onSearch={onSearch} />
        <ReportsSection />
      </div>
    </div>
  );
}
