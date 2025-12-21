import type { ButtonHTMLAttributes, InputHTMLAttributes, HTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline' | 'transparent';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type FontWeight = 'normal' | 'bold';
export type BadgeVariant = 'default' | 'vibration' | 'thermal' | 'success' | 'warning' | 'danger';
export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  font?: FontWeight;
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
  variant?: BadgeVariant;
}

export interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
}

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
}
