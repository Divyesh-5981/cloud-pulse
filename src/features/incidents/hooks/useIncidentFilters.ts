import { useCallback, useMemo, useState } from 'react';

import { getDefaultFilterValues } from '../config';
import { type FilterValues } from '../types';

interface UseIncidentFiltersParams {
  onPageReset: () => void;
}

interface UseIncidentFiltersReturn {
  filters: FilterValues;
  hasActiveFilters: boolean;
  setFilter: (filterId: string, values: string[]) => void;
  removeFilterValue: (filterId: string, value: string) => void;
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

  const setFilter = useCallback(
    (filterId: string, values: string[]) => {
      let didChange = false;

      setFilters((prev) => {
        const prevValues = prev[filterId] ?? [];
        if (
          prevValues.length === values.length &&
          prevValues.every((v, i) => v === values[i])
        ) {
          return prev;
        }
        didChange = true;
        return { ...prev, [filterId]: values };
      });

      if (didChange) {
        onPageReset();
      }
    },
    [onPageReset],
  );

  const removeFilterValue = useCallback(
    (filterId: string, value: string) => {
      setFilters((prev) => {
        const prevValues = prev[filterId] ?? [];
        const next = prevValues.filter((v) => v !== value);
        if (next.length === prevValues.length) return prev;
        return { ...prev, [filterId]: next };
      });
      onPageReset();
    },
    [onPageReset],
  );

  const clearAll = useCallback(() => {
    setFilters(getDefaultFilterValues());
    onPageReset();
  }, [onPageReset]);

  return { filters, hasActiveFilters, setFilter, removeFilterValue, clearAll };
}
