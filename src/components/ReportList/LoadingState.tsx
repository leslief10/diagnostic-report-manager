import { SkeletonCard } from '@/components/ui/Skeleton';

export function LoadingState() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading reports">
      <SkeletonCard lines={2} />
      <SkeletonCard lines={2} />
      <SkeletonCard lines={2} />
    </div>
  );
}
