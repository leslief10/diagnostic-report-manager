import type { UploadContentProps } from '@/types';

export function UploadContent({ isDragging }: UploadContentProps) {
  return (
    <div className="space-y-1">
      <p className="text-lg font-medium text-gray-900">{isDragging ? 'Drop file here' : 'Drag & drop a file here'}</p>
      <p className="text-sm text-gray-500">or click to browse</p>
    </div>
  );
}
