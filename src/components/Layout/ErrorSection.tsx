import { Alert } from '@/components/ui/Alert/Alert';
import type { ErrorSectionProps } from '@/types';

export function ErrorSection({ error, onDismiss }: ErrorSectionProps) {
  if (!error) {
    return null;
  }

  return (
    <Alert variant="danger" title="Error">
      {error}
      <button onClick={onDismiss} className="mt-2 text-sm underline hover:no-underline">
        Dismiss
      </button>
    </Alert>
  );
}
