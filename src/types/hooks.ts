import type { Report } from './report';

export interface StatusMessage {
  type: 'success' | 'error' | 'info' | null;
  text: string;
}

export interface UseSearchProps {
  onSearch: (query: string) => void;
}

export interface UseReportFilteringReturn {
  reports: Report[];
  filteredReports: Report[];
  searchQuery: string;
  isLoading: boolean;
  hasNoResults: boolean;
  isSearching: boolean;
  isInitiallyEmpty: boolean;
  isSearchWithNoResults: boolean;
}

export interface UseReportDownloadReturn {
  handleDownload: (report: Report) => void;
}

export interface UseFileUploadReturn {
  isDragging: boolean;
  statusMessage: StatusMessage;
  uploadProgress: number;
  isLoading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}
