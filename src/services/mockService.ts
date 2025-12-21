import type { Report } from '../types';
import { delay } from '../utils/utilityFunctions';

const initialReports: Report[] = [
  { id: 1, name: 'vibration_analysis_01.pdf', size: '2.4MB', type: 'Vibration', date: '2023-10-01' },
  { id: 2, name: 'motor_thermal_B.csv', size: '1.1MB', type: 'Thermal', date: '2023-10-02' },
];

export const mockService = {
  async getReports(): Promise<Report[]> {
    await delay(500);
    return [...initialReports];
  },

  async uploadReport(file: File): Promise<Report> {
    await delay(2000);

    if (Math.random() < 0.1) {
      throw new Error('Upload failed');
    }

    return {
      id: Date.now(),
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)}MB`,
      type: file.name.includes('vibration') ? 'Vibration' : 'Thermal',
      date: new Date().toISOString().split('T')[0],
    };
  },
};
