import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useReportStore } from './reportStore';
import { mockService } from '../services/mockService';
import * as utilityFunctions from '../utils/utilityFunctions';
import type { Report } from '../types/types';

vi.mock('../services/mockService');
vi.mock('../utils/utilityFunctions');

const mockReport: Report = {
  id: 1,
  name: 'test_report.pdf',
  size: '2.5MB',
  type: 'Vibration',
  date: '2023-10-01',
};

const mockReport2: Report = {
  id: 2,
  name: 'test_report2.csv',
  size: '1.2MB',
  type: 'Thermal',
  date: '2023-10-02',
};

describe('useReportStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useReportStore.setState({
      reports: [],
      searchQuery: '',
      isLoading: false,
      error: null,
      uploadProgress: 0,
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  describe('fetchReports', () => {
    it('should fetch reports successfully', async () => {
      vi.mocked(mockService.getReports).mockResolvedValue([mockReport, mockReport2]);

      await useReportStore.getState().fetchReports();

      const state = useReportStore.getState();
      expect(state.reports).toEqual([mockReport, mockReport2]);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should set isLoading to true during fetch', async () => {
      vi.mocked(utilityFunctions.delay).mockResolvedValue(undefined);
      vi.mocked(mockService.getReports).mockResolvedValue([mockReport]);

      const promise = useReportStore.getState().fetchReports();
      expect(useReportStore.getState().isLoading).toBe(true);

      await promise;
      expect(useReportStore.getState().isLoading).toBe(false);
    });

    it('should handle fetch error', async () => {
      const error = new Error('Network error');
      vi.mocked(mockService.getReports).mockRejectedValue(error);

      await useReportStore.getState().fetchReports();

      const state = useReportStore.getState();
      expect(state.error).toBe('Failed to fetch reports');
      expect(state.isLoading).toBe(false);
      expect(state.reports).toEqual([]);
    });

    it('should clear previous error on fetch', async () => {
      useReportStore.setState({ error: 'Previous error' });
      vi.mocked(mockService.getReports).mockResolvedValue([mockReport]);

      await useReportStore.getState().fetchReports();

      expect(useReportStore.getState().error).toBeNull();
    });
  });

  describe('uploadReport', () => {
    const mockFile = new File(['content'], 'test.pdf', { type: 'application/pdf' });

    it('should upload report successfully', async () => {
      useReportStore.setState({ reports: [mockReport2] });
      vi.mocked(mockService.uploadReport).mockResolvedValue(mockReport);

      await useReportStore.getState().uploadReport(mockFile);

      vi.runAllTimers();

      const state = useReportStore.getState();
      expect(state.reports[0]).toEqual(mockReport);
      expect(state.reports[1]).toEqual(mockReport2);
      expect(state.isLoading).toBe(false);
      expect(state.uploadProgress).toBe(0);
      expect(state.error).toBeNull();
    });

    it('should prepend new report to reports array', async () => {
      useReportStore.setState({ reports: [mockReport2] });
      vi.mocked(mockService.uploadReport).mockResolvedValue(mockReport);

      await useReportStore.getState().uploadReport(mockFile);

      vi.runAllTimers();

      const state = useReportStore.getState();
      expect(state.reports).toHaveLength(2);
      expect(state.reports[0].id).toBe(mockReport.id);
      expect(state.reports[1].id).toBe(mockReport2.id);
    });

    it('should set uploadProgress to 100 on success', async () => {
      vi.mocked(mockService.uploadReport).mockResolvedValue(mockReport);

      await useReportStore.getState().uploadReport(mockFile);

      expect(useReportStore.getState().uploadProgress).toBe(100);
    });

    it('should reset uploadProgress after 1 second', async () => {
      vi.mocked(mockService.uploadReport).mockResolvedValue(mockReport);

      await useReportStore.getState().uploadReport(mockFile);
      expect(useReportStore.getState().uploadProgress).toBe(100);

      vi.advanceTimersByTime(1000);
      expect(useReportStore.getState().uploadProgress).toBe(0);
    });

    it('should increment upload progress during upload', async () => {
      vi.mocked(utilityFunctions.delay).mockResolvedValue(undefined);
      vi.mocked(mockService.uploadReport).mockResolvedValue(mockReport);

      const promise = useReportStore.getState().uploadReport(mockFile);

      vi.advanceTimersByTime(200);
      expect(useReportStore.getState().uploadProgress).toBeGreaterThan(0);

      vi.advanceTimersByTime(200);
      expect(useReportStore.getState().uploadProgress).toBeGreaterThan(10);

      await promise;
      vi.runAllTimers();
    });

    it('should handle upload error', async () => {
      const error = new Error('Upload failed');
      vi.mocked(mockService.uploadReport).mockRejectedValue(error);

      await useReportStore.getState().uploadReport(mockFile);

      const state = useReportStore.getState();
      expect(state.error).toBe('Upload failed. Please try again.');
      expect(state.isLoading).toBe(false);
      expect(state.uploadProgress).toBe(0);
    });

    it('should not add report on upload error', async () => {
      useReportStore.setState({ reports: [mockReport2] });
      vi.mocked(mockService.uploadReport).mockRejectedValue(new Error('Upload failed'));

      await useReportStore.getState().uploadReport(mockFile);

      expect(useReportStore.getState().reports).toEqual([mockReport2]);
    });

    it('should set isLoading to true during upload', async () => {
      vi.mocked(utilityFunctions.delay).mockResolvedValue(undefined);
      vi.mocked(mockService.uploadReport).mockResolvedValue(mockReport);

      const promise = useReportStore.getState().uploadReport(mockFile);
      expect(useReportStore.getState().isLoading).toBe(true);

      await promise;
      expect(useReportStore.getState().isLoading).toBe(false);
    });

    it('should clear previous error on successful upload', async () => {
      useReportStore.setState({ error: 'Previous error' });
      vi.mocked(mockService.uploadReport).mockResolvedValue(mockReport);

      await useReportStore.getState().uploadReport(mockFile);

      expect(useReportStore.getState().error).toBeNull();
    });
  });

  describe('setSearchQuery', () => {
    it('should set search query', () => {
      useReportStore.getState().setSearchQuery('vibration');
      expect(useReportStore.getState().searchQuery).toBe('vibration');
    });

    it('should update search query', () => {
      useReportStore.getState().setSearchQuery('thermal');
      useReportStore.getState().setSearchQuery('vibration');
      expect(useReportStore.getState().searchQuery).toBe('vibration');
    });

    it('should handle empty search query', () => {
      useReportStore.getState().setSearchQuery('test');
      useReportStore.getState().setSearchQuery('');
      expect(useReportStore.getState().searchQuery).toBe('');
    });
  });

  describe('clearError', () => {
    it('should clear error message', () => {
      useReportStore.setState({ error: 'Some error' });
      useReportStore.getState().clearError();
      expect(useReportStore.getState().error).toBeNull();
    });

    it('should handle clearing when error is null', () => {
      useReportStore.setState({ error: null });
      useReportStore.getState().clearError();
      expect(useReportStore.getState().error).toBeNull();
    });
  });
});
