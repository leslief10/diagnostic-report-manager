export type ReportType = 'Vibration' | 'Thermal';

export interface Report {
  id: number;
  name: string;
  size: string;
  type: ReportType;
  date: string;
}

export interface ReportState {
  reports: Report[];
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  uploadProgress: number;

  fetchReports: () => Promise<void>;
  uploadReport: (file: File) => Promise<void>;
  setSearchQuery: (query: string) => void;
  clearError: () => void;
}

export interface ReportCardProps {
  report: Report;
}
