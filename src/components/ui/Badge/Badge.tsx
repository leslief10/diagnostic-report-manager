import { combineClasses } from '@/utils/utilityFunctions';
import type { BadgeProps } from '@/types';

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-gray-200 text-gray-900 border-gray-300',
    vibration: 'bg-purple-100 text-purple-800 border-purple-200',
    thermal: 'bg-orange-100 text-orange-800 border-orange-200',
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    danger: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <span
      className={combineClasses(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
