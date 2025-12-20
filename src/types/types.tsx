export interface Report {
  id: number;
  name: string;
  size: string;
  type: 'Vibration' | 'Thermal';
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
