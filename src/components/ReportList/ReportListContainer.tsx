import { ReportCard } from '@/components/ReportCard';
import type { ReportListContainerProps } from '@/types';

export function ReportListContainer({ reports, searchQuery }: ReportListContainerProps) {
  return (
    <div
      className="space-y-4"
      role="region"
      aria-label="Diagnostic reports list"
      aria-live="polite"
      aria-atomic="false"
    >
      <div className="sr-only" role="status" aria-live="polite">
        {reports.length} report{reports.length !== 1 ? 's' : ''} found
        {searchQuery && ` matching "${searchQuery}"`}
      </div>

      {reports.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  );
}
