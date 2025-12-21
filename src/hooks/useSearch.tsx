import { useEffect, useRef, useState, useCallback } from 'react';
import type { UseSearchProps } from '@/types';

const DEBOUNCE_DELAY = 300;

export function useSearch({ onSearch }: UseSearchProps) {
  const [localValue, setLocalValue] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (isMountedRef.current) {
        onSearch(localValue);
      }
    }, DEBOUNCE_DELAY);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [localValue, onSearch]);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleValueChange = useCallback((value: string) => {
    setLocalValue(value);
  }, []);

  const handleClear = useCallback(() => {
    setLocalValue('');

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onSearch('');
  }, [onSearch]);

  return {
    value: localValue,
    onValueChange: handleValueChange,
    onClear: handleClear,
  };
}
