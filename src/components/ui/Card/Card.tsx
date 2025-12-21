import type { HTMLAttributes } from 'react';
import { combineClasses } from '@/utils/utilityFunctions';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={combineClasses('rounded-lg border border-gray-200 bg-white shadow-sm', className)} {...props} />
  );
}
