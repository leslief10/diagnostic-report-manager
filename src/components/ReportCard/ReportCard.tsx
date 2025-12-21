import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button/Button';
import { useReportDownload } from '@/hooks/useReportDownload';
import { DownloadIcon } from './Icons';
import { ReportCardHeader } from './ReportCardHeader';
import { ReportCardMetadata } from './ReportCardMetadata';
import type { ReportCardProps } from '@/types';

export function ReportCard({ report }: ReportCardProps) {
  const { handleDownload } = useReportDownload();

  return (
    <Card className="hover:shadow-md transition-shadow">
      <ReportCardHeader report={report} />

      <CardContent>
        <ReportCardMetadata report={report} />

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleDownload(report)}
          fullWidth
          aria-label={`Download ${report.name}`}
        >
          <DownloadIcon />
          Download
        </Button>
      </CardContent>
    </Card>
  );
}
