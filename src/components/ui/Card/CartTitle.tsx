import type { HTMLAttributes } from 'react';
import { combineClasses } from '@/utils/utilityFunctions';

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <h3 className={combineClasses('text-lg font-semibold leading-none tracking-tight', className)} {...props} />;
}
