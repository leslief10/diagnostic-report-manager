import type { HTMLAttributes } from 'react';
import { combineClasses } from '@/utils/utilityFunctions';

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={combineClasses('p-4 pt-0', className)} {...props} />;
}
