import { useFileUpload } from '@/hooks/useFileUpload';
import { Alert } from '@/components/ui/Alert/Alert';
import { ProgressBar } from '@/components/ui/ProgressBar/ProgressBar';
import { UploadZone } from './UploadZone';
import { UploadIcon } from './UploadIcon';
import { UploadContent } from './UploadContent';
import { UploadConstraints } from './UploadConstraints';
import { UploadInstructions } from './UploadInstructions';

export function UploadForm() {
  const {
    isDragging,
    statusMessage,
    uploadProgress,
    isLoading,
    fileInputRef,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileInputChange,
    handleClick,
    handleKeyDown,
  } = useFileUpload();

  return (
    <div className="space-y-4">
      <UploadZone
        isDragging={isDragging}
        isLoading={isLoading}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="sr-only"
          accept=".pdf,.csv"
          onChange={handleFileInputChange}
          disabled={isLoading}
          aria-label="File input"
        />

        <UploadIcon />
        <UploadContent isDragging={isDragging} />
        <UploadConstraints />
      </UploadZone>

      {uploadProgress > 0 && uploadProgress < 100 && (
        <ProgressBar value={uploadProgress} label="Uploading file" showPercentage />
      )}

      {statusMessage.type && (
        <Alert
          variant={statusMessage.type === 'success' ? 'success' : statusMessage.type === 'error' ? 'danger' : 'info'}
        >
          {statusMessage.text}
        </Alert>
      )}

      <UploadInstructions />
    </div>
  );
}
