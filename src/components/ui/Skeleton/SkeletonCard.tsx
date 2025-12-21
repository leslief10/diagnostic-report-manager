import { Skeleton } from './Skeleton';

export function SkeletonCard({ lines = 3 }: { lines?: number }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-3" aria-busy="true">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/5" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-8 w-24" />
      </div>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`h-4 ${i === lines - 1 ? 'w-4/5' : 'w-full'}`} />
      ))}
    </div>
  );
}
