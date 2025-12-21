import { useMemo } from 'react';
import { useReportStore } from '@/store/reportStore';

export function useReportFiltering() {
  const { reports, searchQuery, isLoading } = useReportStore();

  const filteredReports = useMemo(() => {
    if (!searchQuery.trim()) {
      return reports;
    }

    const query = searchQuery.toLowerCase();
    return reports.filter((report) => report.name.toLowerCase().includes(query));
  }, [reports, searchQuery]);

  const hasNoResults = filteredReports.length === 0;
  const isSearching = searchQuery.trim().length > 0;
  const isInitiallyEmpty = reports.length === 0 && !isLoading;
  const isSearchWithNoResults = isSearching && hasNoResults;

  return {
    reports,
    filteredReports,
    searchQuery,
    isLoading,
    hasNoResults,
    isSearching,
    isInitiallyEmpty,
    isSearchWithNoResults,
  };
}
