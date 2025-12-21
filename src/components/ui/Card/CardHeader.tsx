import type { HTMLAttributes } from 'react';
import { combineClasses } from '@/utils/utilityFunctions';

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={combineClasses('flex flex-col space-y-1.5 p-4 pb-3', className)} {...props} />;
}
