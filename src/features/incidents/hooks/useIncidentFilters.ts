import { useCallback, useMemo, useRef, useState } from 'react';

import { getDefaultFilterValues } from '../config';
import { type FilterValues } from '../types';

interface UseIncidentFiltersParams {
  onPageReset: () => void;
}

interface UseIncidentFiltersReturn {
  filters: FilterValues;
  hasActiveFilters: boolean;
  setFilter: (filterId: string, values: string[]) => void;
  clearAll: () => void;
}

export function useIncidentFilters({
  onPageReset,
}: UseIncidentFiltersParams): UseIncidentFiltersReturn {
  const [filters, setFilters] = useState<FilterValues>(getDefaultFilterValues);

  const hasActiveFilters = useMemo(
    () => Object.values(filters).some((values) => values.length > 0),
    [filters],
  );

  const didChangeRef = useRef(false);

  const setFilter = useCallback(
    (filterId: string, values: string[]) => {
      didChangeRef.current = false;

      setFilters((prev) => {
        const prevValues = prev[filterId] ?? [];
        if (
          prevValues.length === values.length &&
          prevValues.every((v, i) => v === values[i])
        ) {
          return prev;
        }
        didChangeRef.current = true;
        return { ...prev, [filterId]: values };
      });

      if (didChangeRef.current) {
        onPageReset();
      }
    },
    [onPageReset],
  );

  const clearAll = useCallback(() => {
    setFilters(getDefaultFilterValues());
    onPageReset();
  }, [onPageReset]);

  return { filters, hasActiveFilters, setFilter, clearAll };
}
