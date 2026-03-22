import { act, renderHook } from '@testing-library/react';

import { useIncidentFilters } from '../useIncidentFilters';

describe('useIncidentFilters', () => {
  const mockPageReset = vi.fn();

  beforeEach(() => {
    mockPageReset.mockReset();
  });

  it('starts with empty filters and no active filters', () => {
    const { result } = renderHook(() =>
      useIncidentFilters({ onPageReset: mockPageReset }),
    );

    expect(result.current.hasActiveFilters).toBe(false);
    expect(mockPageReset).not.toHaveBeenCalled();
  });

  it('sets a filter and resets pagination', () => {
    const { result } = renderHook(() =>
      useIncidentFilters({ onPageReset: mockPageReset }),
    );

    act(() => result.current.setFilter('severity', ['Critical']));

    expect(result.current.filters.severity).toEqual(['Critical']);
    expect(result.current.hasActiveFilters).toBe(true);
    expect(mockPageReset).toHaveBeenCalledTimes(1);
  });

  it('does not reset pagination when value is unchanged', () => {
    const { result } = renderHook(() =>
      useIncidentFilters({ onPageReset: mockPageReset }),
    );

    act(() => result.current.setFilter('severity', ['High']));
    mockPageReset.mockClear();

    act(() => result.current.setFilter('severity', ['High']));
    expect(mockPageReset).not.toHaveBeenCalled();
  });

  it('clearAll resets all filters and pagination', () => {
    const { result } = renderHook(() =>
      useIncidentFilters({ onPageReset: mockPageReset }),
    );

    act(() => result.current.setFilter('severity', ['Critical']));
    act(() => result.current.setFilter('status', ['Open']));
    mockPageReset.mockClear();

    act(() => result.current.clearAll());

    expect(result.current.hasActiveFilters).toBe(false);
    expect(result.current.filters.severity).toEqual([]);
    expect(result.current.filters.status).toEqual([]);
    expect(mockPageReset).toHaveBeenCalledTimes(1);
  });

  it('supports multiple filter values', () => {
    const { result } = renderHook(() =>
      useIncidentFilters({ onPageReset: mockPageReset }),
    );

    act(() => result.current.setFilter('severity', ['Critical', 'High']));

    expect(result.current.filters.severity).toEqual(['Critical', 'High']);
    expect(result.current.hasActiveFilters).toBe(true);
  });
});
