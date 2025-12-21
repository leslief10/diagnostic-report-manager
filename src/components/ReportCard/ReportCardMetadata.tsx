import { FileIcon, CalendarIcon } from '@/components/ReportCard';
import type { ReportCardProps } from '@/types';

export function ReportCardMetadata({ report }: ReportCardProps) {
  const formattedDate = new Date(report.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
      <div className="flex items-center gap-1">
        <FileIcon />
        <span>{report.size}</span>
      </div>

      <div className="flex items-center gap-1">
        <CalendarIcon />
        <time dateTime={report.date}>{formattedDate}</time>
      </div>
    </div>
  );
}
