import { UploadForm } from '@/components/UploadForm';

export function Sidebar() {
  return (
    <aside className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow p-6 sticky top-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Report</h2>
        <UploadForm />
      </div>
    </aside>
  );
}
