import type { ButtonHTMLAttributes, InputHTMLAttributes, HTMLAttributes } from 'react';

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

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'transparent';
  size?: 'sm' | 'md' | 'lg';
  font?: 'normal' | 'bold';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export interface SearchInputProps extends Omit<InputProps, 'type'> {
  value?: string;

  onClear?: () => void;
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'vibration' | 'thermal' | 'success' | 'warning' | 'danger';
}

export interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
}

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
}
