import { CardHeader, CardTitle } from '@/components/ui/Card';
import { ReportBadge } from '@/components/ui/Badge/ReportBadge';
import type { ReportCardProps } from '@/types';

export function ReportCardHeader({ report }: ReportCardProps) {
  return (
    <CardHeader>
      <div className="flex items-start justify-between gap-4">
        <CardTitle className="flex-1 wrap-break-word">{report.name}</CardTitle>
        <ReportBadge type={report.type} />
      </div>
    </CardHeader>
  );
}
