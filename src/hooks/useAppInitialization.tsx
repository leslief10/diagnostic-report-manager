import { useEffect } from 'react';
import { useReportStore } from '@/store/reportStore';

export function useAppInitialization() {
  const { fetchReports, setSearchQuery, error, clearError } = useReportStore();

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return {
    setSearchQuery,
    error,
    clearError,
  };
}
