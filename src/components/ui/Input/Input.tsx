import { useId } from 'react';
import { combineClasses } from '@/utils/utilityFunctions';
import type { InputProps } from '@/types/types';

export function Input({ className, label, error, helperText, fullWidth, id, required, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <div className={combineClasses('flex flex-col gap-1.5', fullWidth && 'w-full')}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-800 ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        required={required}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={combineClasses(error && errorId, helperText && helperId)}
        className={combineClasses(
          'flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm',
          'placeholder:text-gray-400',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-blue focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error ? 'border-red-700 focus-visible:ring-red-700' : 'border-gray-300',
          className,
        )}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-sm text-red-800" role="alert" aria-live="polite">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={helperId} className="text-sm text-gray-600">
          {helperText}
        </p>
      )}
    </div>
  );
}
