import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSearch } from './useSearch';

const DEBOUNCE_DELAY = 300;

describe('useSearch', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should initialize with empty value', () => {
    const mockOnSearch = vi.fn();
    const { result } = renderHook(() => useSearch({ onSearch: mockOnSearch }));

    expect(result.current.value).toBe('');
  });

  it('should not call onSearch on initial render', () => {
    const mockOnSearch = vi.fn();
    renderHook(() => useSearch({ onSearch: mockOnSearch }));
    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  describe('value change', () => {
    it('should update local value when onValueChange is called', () => {
      const mockOnSearch = vi.fn();
      const { result } = renderHook(() => useSearch({ onSearch: mockOnSearch }));

      act(() => {
        result.current.onValueChange('test');
      });
      expect(result.current.value).toBe('test');
    });

    it('should handle multiple value changes', () => {
      const mockOnSearch = vi.fn();
      const { result } = renderHook(() => useSearch({ onSearch: mockOnSearch }));

      act(() => {
        result.current.onValueChange('t');
        result.current.onValueChange('te');
        result.current.onValueChange('test');
      });
      expect(result.current.value).toBe('test');
    });
  });

  describe('debouncing', () => {
    it('should debounce search calls', () => {
      const mockOnSearch = vi.fn();
      const { result } = renderHook(() => useSearch({ onSearch: mockOnSearch }));

      act(() => {
        result.current.onValueChange('test');
      });
      expect(mockOnSearch).not.toHaveBeenCalled();
      act(() => {
        vi.advanceTimersByTime(DEBOUNCE_DELAY);
      });

      expect(mockOnSearch).toHaveBeenCalledWith('test');
      expect(mockOnSearch).toHaveBeenCalledTimes(1);
    });

    it('should reset debounce timer on new value', () => {
      const mockOnSearch = vi.fn();
      const { result } = renderHook(() => useSearch({ onSearch: mockOnSearch }));

      act(() => {
        result.current.onValueChange('t');
      });
      act(() => {
        vi.advanceTimersByTime(100);
      });
      expect(mockOnSearch).not.toHaveBeenCalled();
      act(() => {
        result.current.onValueChange('te');
      });
      expect(mockOnSearch).not.toHaveBeenCalled();
      act(() => {
        vi.advanceTimersByTime(100);
      });
      expect(mockOnSearch).not.toHaveBeenCalled();
      act(() => {
        vi.advanceTimersByTime(200);
      });
      expect(mockOnSearch).toHaveBeenCalledWith('te');
      expect(mockOnSearch).toHaveBeenCalledTimes(1);
    });
  });

  describe('clear functionality', () => {
    it('should clear value when onClear is called', () => {
      const mockOnSearch = vi.fn();
      const { result } = renderHook(() => useSearch({ onSearch: mockOnSearch }));

      act(() => {
        result.current.onValueChange('test');
      });
      expect(result.current.value).toBe('test');
      act(() => {
        result.current.onClear();
      });
      expect(result.current.value).toBe('');
    });

    it('should call onSearch with empty string on clear', () => {
      const mockOnSearch = vi.fn();
      const { result } = renderHook(() => useSearch({ onSearch: mockOnSearch }));

      act(() => {
        result.current.onValueChange('test');
        vi.advanceTimersByTime(DEBOUNCE_DELAY);
      });
      mockOnSearch.mockClear();
      act(() => {
        result.current.onClear();
        vi.advanceTimersByTime(DEBOUNCE_DELAY);
      });
      expect(mockOnSearch).toHaveBeenCalledWith('');
    });

    it('should clear without debounce delay', () => {
      const mockOnSearch = vi.fn();
      const { result } = renderHook(() => useSearch({ onSearch: mockOnSearch }));
      act(() => {
        result.current.onClear();
      });
      expect(result.current.value).toBe('');
    });
  });

  describe('cleanup', () => {
    it('should cleanup debounce timer on unmount', () => {
      const mockOnSearch = vi.fn();
      const { unmount } = renderHook(() => useSearch({ onSearch: mockOnSearch }));

      unmount();
      act(() => {
        vi.advanceTimersByTime(DEBOUNCE_DELAY);
      });
      expect(mockOnSearch).not.toHaveBeenCalled();
    });

    it('should cleanup timer when component unmounts with pending search', () => {
      const mockOnSearch = vi.fn();
      const { result, unmount } = renderHook(() => useSearch({ onSearch: mockOnSearch }));

      act(() => {
        result.current.onValueChange('test');
      });
      unmount();
      act(() => {
        vi.advanceTimersByTime(DEBOUNCE_DELAY);
      });
      expect(mockOnSearch).not.toHaveBeenCalled();
    });
  });

  describe('return values', () => {
    it('should return value, onValueChange, and onClear', () => {
      const mockOnSearch = vi.fn();
      const { result } = renderHook(() => useSearch({ onSearch: mockOnSearch }));

      expect(result.current).toHaveProperty('value');
      expect(result.current).toHaveProperty('onValueChange');
      expect(result.current).toHaveProperty('onClear');
    });

    it('should return correct types', () => {
      const mockOnSearch = vi.fn();
      const { result } = renderHook(() => useSearch({ onSearch: mockOnSearch }));

      expect(typeof result.current.value).toBe('string');
      expect(typeof result.current.onValueChange).toBe('function');
      expect(typeof result.current.onClear).toBe('function');
    });
  });

  describe('callback stability', () => {
    it('should return stable onValueChange callback', () => {
      const mockOnSearch = vi.fn();
      const { result, rerender } = renderHook(() => useSearch({ onSearch: mockOnSearch }));

      const firstCallback = result.current.onValueChange;
      rerender();

      const secondCallback = result.current.onValueChange;
      expect(firstCallback).toBe(secondCallback);
    });

    it('should return stable onClear callback', () => {
      const mockOnSearch = vi.fn();
      const { result, rerender } = renderHook(() => useSearch({ onSearch: mockOnSearch }));

      const firstCallback = result.current.onClear;
      rerender();

      const secondCallback = result.current.onClear;
      expect(firstCallback).toBe(secondCallback);
    });
  });

  describe('edge cases', () => {
    it('should handle empty string search', () => {
      const mockOnSearch = vi.fn();
      const { result } = renderHook(() => useSearch({ onSearch: mockOnSearch }));

      act(() => {
        result.current.onValueChange('');
        vi.advanceTimersByTime(DEBOUNCE_DELAY);
      });
      expect(mockOnSearch).toHaveBeenCalledWith('');
    });
  });
});
