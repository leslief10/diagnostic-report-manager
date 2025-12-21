import type { UploadZoneProps } from '@/types';

export function UploadZone({
  isDragging,
  isLoading,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onClick,
  onKeyDown,
  children,
}: UploadZoneProps) {
  return (
    <div
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex={isLoading ? -1 : 0}
      aria-label="File upload drop zone. Click or press Enter to browse files, or drag and drop a file here."
      aria-disabled={isLoading}
      className={`
        relative border-2 border-dashed rounded-lg p-8 text-center
        transition-all duration-200 cursor-pointer
        ${
          isDragging
            ? 'border-slate-blue bg-blue-50 scale-105'
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
        }
        ${isLoading ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-blue focus-visible:ring-offset-2
      `}
    >
      {children}
    </div>
  );
}
