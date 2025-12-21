export function UploadInstructions() {
  return (
    <div className="text-sm text-gray-600 space-y-2">
      <p className="font-medium">Upload Instructions:</p>
      <ul className="list-disc list-inside space-y-1 ml-2">
        <li>Only PDF and CSV files are accepted</li>
        <li>Files must be smaller than 10MB</li>
        <li>Files will be validated before upload</li>
        <li>Upload progress will be displayed during the process</li>
      </ul>
    </div>
  );
}
