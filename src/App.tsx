import { useAppInitialization } from '@/hooks/useAppInitialization';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Sidebar } from '@/components/Layout/Sidebar';
import { MainContent } from '@/components/Layout/MainContent';

function App() {
  const { setSearchQuery, error, clearError } = useAppInitialization();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Sidebar />
          <MainContent error={error} onDismissError={clearError} onSearch={setSearchQuery} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
