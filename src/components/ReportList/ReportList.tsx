import { useReportFiltering } from '@/hooks/useReportFiltering';
import { LoadingState } from './LoadingState';
import { EmptySearchState } from './EmptySearchState';
import { EmptyState } from './EmptyState';
import { ReportListContainer } from './ReportListContainer';

export function ReportList() {
  const { filteredReports, searchQuery, isLoading, reports, isSearchWithNoResults, isInitiallyEmpty } =
    useReportFiltering();

  if (isLoading && reports.length === 0) {
    return <LoadingState />;
  }

  if (isSearchWithNoResults) {
    return <EmptySearchState searchQuery={searchQuery} />;
  }

  if (isInitiallyEmpty) {
    return <EmptyState />;
  }

  return <ReportListContainer reports={filteredReports} searchQuery={searchQuery} />;
}
