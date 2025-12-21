import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockService } from './mockService';
import * as utilityFunctions from '../utils/utilityFunctions';

vi.mock('../utils/utilityFunctions');

describe('mockService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(utilityFunctions.delay).mockResolvedValue(undefined);
  });

  describe('getReports', () => {
    it('should return initial reports', async () => {
      const reports = await mockService.getReports();

      expect(reports).toHaveLength(2);
      expect(reports[0]).toEqual({
        id: 1,
        name: 'vibration_analysis_01.pdf',
        size: '2.4MB',
        type: 'Vibration',
        date: '2023-10-01',
      });
      expect(reports[1]).toEqual({
        id: 2,
        name: 'motor_thermal_B.csv',
        size: '1.1MB',
        type: 'Thermal',
        date: '2023-10-02',
      });
    });

    it('should call delay with 500ms', async () => {
      await mockService.getReports();
      expect(utilityFunctions.delay).toHaveBeenCalledWith(500);
    });

    it('should return a copy of initial reports', async () => {
      const reports1 = await mockService.getReports();
      const reports2 = await mockService.getReports();
      expect(reports1).toEqual(reports2);
      expect(reports1).not.toBe(reports2);
    });
  });

  describe('uploadReport', () => {
    it('should successfully upload a vibration file', async () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5);
      const file = new File(['content'], 'vibration_test.pdf', { type: 'application/pdf' });

      const report = await mockService.uploadReport(file);

      expect(report.name).toBe('vibration_test.pdf');
      expect(report.type).toBe('Vibration');
      expect(report.id).toBeDefined();
      expect(report.size).toMatch(/^\d+\.\d+MB$/);
      expect(report.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('should successfully upload a thermal file', async () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5);
      const file = new File(['content'], 'thermal_test.csv', { type: 'text/csv' });

      const report = await mockService.uploadReport(file);

      expect(report.type).toBe('Thermal');
    });

    it('should call delay with 2000ms', async () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5);
      const file = new File(['content'], 'test.pdf');

      await mockService.uploadReport(file);

      expect(utilityFunctions.delay).toHaveBeenCalledWith(2000);
    });

    it('should throw error on upload failure', async () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.05);
      const file = new File(['content'], 'test.pdf');

      await expect(mockService.uploadReport(file)).rejects.toThrow('Upload failed');
    });

    it('should calculate file size correctly', async () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5);
      const content = new Uint8Array(1024 * 1024 * 2.5); // 2.5MB
      const file = new File([content], 'large_file.pdf');

      const report = await mockService.uploadReport(file);

      expect(report.size).toBe('2.5MB');
    });
  });
});
