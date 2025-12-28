import { useEffect, useState, useCallback } from 'react';
import type { UseSearchProps } from '@/types';

const DEBOUNCE_DELAY = 300;

export function useSearch({ onSearch }: UseSearchProps) {
  const [localValue, setLocalValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(localValue);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [localValue, onSearch]);

  const handleValueChange = useCallback((value: string) => {
    setLocalValue(value);
  }, []);

  const handleClear = useCallback(() => {
    setLocalValue('');
    onSearch('');
  }, [onSearch]);

  return {
    value: localValue,
    onValueChange: handleValueChange,
    onClear: handleClear,
  };
}
