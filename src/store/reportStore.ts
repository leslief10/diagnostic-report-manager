import { create } from 'zustand';
import { mockService } from '../services/mockService';
import type { ReportState } from '../types';

export const useReportStore = create<ReportState>((set) => ({
  reports: [],
  searchQuery: '',
  isLoading: false,
  error: null,
  uploadProgress: 0,

  fetchReports: async () => {
    set({ isLoading: true, error: null });
    try {
      const reports = await mockService.getReports();
      set({ reports, isLoading: false });
    } catch (error) {
      console.error(error);
      set({ error: 'Failed to fetch reports', isLoading: false });
    }
  },

  uploadReport: async (file: File) => {
    set({ isLoading: true, error: null, uploadProgress: 0 });

    const progressInterval = setInterval(() => {
      set((state) => ({
        uploadProgress: Math.min(state.uploadProgress + 10, 90),
      }));
    }, 200);

    try {
      const newReport = await mockService.uploadReport(file);
      clearInterval(progressInterval);

      set((state) => ({
        reports: [newReport, ...state.reports],
        isLoading: false,
        uploadProgress: 100,
        error: null,
      }));

      setTimeout(() => set({ uploadProgress: 0 }), 1000);
    } catch (error) {
      console.error(error);
      clearInterval(progressInterval);
      set({
        error: 'Upload failed. Please try again.',
        isLoading: false,
        uploadProgress: 0,
      });
    }
  },

  setSearchQuery: (query: string) => set({ searchQuery: query }),
  clearError: () => set({ error: null }),
}));
