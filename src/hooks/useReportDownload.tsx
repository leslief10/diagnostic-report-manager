import type { Report } from '@/types';

export function useReportDownload() {
  const handleDownload = (report: Report) => {
    console.log(`Downloading report: ${report.name}`);
    alert(`Downloading ${report.name}`);
  };

  return { handleDownload };
}
