import { describe, it, expect } from 'vitest';
import { delay, combineClasses } from './utilityFunctions';

describe('utilityFunctions', () => {
  describe('delay', () => {
    it('should resolve after specified milliseconds', async () => {
      const start = Date.now();
      await delay(100);
      const end = Date.now();

      expect(end - start).toBeGreaterThanOrEqual(100);
    });

    it('should resolve immediately with 0ms', async () => {
      const start = Date.now();
      await delay(0);
      const end = Date.now();

      expect(end - start).toBeLessThan(50);
    });

    it('should return a promise', () => {
      const result = delay(100);
      expect(result).toBeInstanceOf(Promise);
    });

    it('should handle large delay values', async () => {
      const start = Date.now();
      await delay(200);
      const end = Date.now();

      expect(end - start).toBeGreaterThanOrEqual(200);
    });
  });

  describe('combineClasses', () => {
    it('should combine multiple valid classes', () => {
      const result = combineClasses('btn', 'btn-primary', 'active');
      expect(result).toBe('btn btn-primary active');
    });

    it('should filter out falsy values', () => {
      const result = combineClasses('btn', false, 'active', null, undefined);
      expect(result).toBe('btn active');
    });

    it('should handle all falsy values', () => {
      const result = combineClasses(false, null, undefined, '');
      expect(result).toBe('');
    });

    it('should handle single class', () => {
      const result = combineClasses('btn');
      expect(result).toBe('btn');
    });

    it('should handle no arguments', () => {
      const result = combineClasses();
      expect(result).toBe('');
    });

    it('should handle empty strings', () => {
      const result = combineClasses('btn', '', 'active');
      expect(result).toBe('btn active');
    });

    it('should handle conditional classes', () => {
      const isActive = true;
      const isDisabled = false;
      const result = combineClasses('btn', isActive && 'active', isDisabled && 'disabled');
      expect(result).toBe('btn active');
    });
  });
});
