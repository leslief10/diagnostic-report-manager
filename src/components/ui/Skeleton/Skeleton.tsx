import { combineClasses } from '@/utils/utilityFunctions';
import type { HTMLAttributes } from 'react';

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={combineClasses('animate-pulse bg-gray-200 rounded', className)} {...props} />;
}
