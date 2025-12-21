import { combineClasses } from '@/utils/utilityFunctions';
import type { ButtonProps } from '@/types/types';

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  font = 'normal',
  isLoading,
  fullWidth,
  children,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

  const variants = {
    primary: 'bg-rose-red text-white hover:bg-dark-rose-red focus-visible:ring-rose-red',
    secondary: 'bg-slate-blue text-white hover:bg-dark-slate-blue focus-visible:ring-slate-blue',
    danger: 'bg-red-700 text-white hover:bg-red-800 focus-visible:ring-red-700',
    outline: 'border border-gray-300 hover:bg-gray-100 focus-visible:ring-gray-500',
    transparent: 'hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-500',
  };

  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-11 px-6 text-lg',
  };

  const fontWeight = {
    normal: 'font-normal',
    bold: 'font-semibold',
  };

  const classes = combineClasses(
    baseClasses,
    variants[variant],
    sizes[size],
    fontWeight[font],
    fullWidth && 'w-full',
    className,
  );

  return (
    <button type={type} disabled={disabled || isLoading} aria-busy={isLoading} className={classes} {...props}>
      {isLoading && (
        <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
