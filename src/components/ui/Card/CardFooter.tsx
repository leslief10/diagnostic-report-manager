import type { HTMLAttributes } from 'react';
import { combineClasses } from '@/utils/utilityFunctions';

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={combineClasses('flex items-center p-4 pt-0', className)} {...props} />;
}
