import type { ReactNode, DragEvent } from 'react';
import type { Report } from './report';

export interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

export interface SearchStatusProps {
  searchQuery: string;
}

export interface ReportListContainerProps {
  reports: Report[];
  searchQuery: string;
}

export interface EmptySearchStateProps {
  searchQuery: string;
}

export interface UploadZoneProps {
  isDragging: boolean;
  isLoading: boolean;
  onDragEnter: (e: DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  children: ReactNode;
}

export interface UploadContentProps {
  isDragging: boolean;
}
