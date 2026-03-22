import { act, renderHook } from '@testing-library/react';

import { useAutoSave } from '../useAutoSave';

describe('useAutoSave', () => {
  const mockSave = vi.fn<(value: string) => Promise<void>>();

  beforeEach(() => {
    vi.useFakeTimers();
    mockSave.mockReset();
    mockSave.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts with idle status and initial value', () => {
    const { result } = renderHook(() =>
      useAutoSave({ initialValue: 'hello', onSave: mockSave }),
    );

    expect(result.current.value).toBe('hello');
    expect(result.current.saveStatus).toBe('idle');
  });

  it('shows "unsaved" immediately after typing', () => {
    const { result } = renderHook(() =>
      useAutoSave({ initialValue: '', onSave: mockSave }),
    );

    act(() => result.current.handleChange('new text'));

    expect(result.current.value).toBe('new text');
    expect(result.current.saveStatus).toBe('unsaved');
    expect(mockSave).not.toHaveBeenCalled();
  });

  it('auto-saves after the debounce delay', async () => {
    const { result } = renderHook(() =>
      useAutoSave({ initialValue: '', onSave: mockSave, delay: 1000 }),
    );

    act(() => result.current.handleChange('saved text'));
    expect(mockSave).not.toHaveBeenCalled();

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    expect(mockSave).toHaveBeenCalledWith('saved text');
    expect(result.current.saveStatus).toBe('idle');
  });

  it('resets debounce timer on each keystroke', async () => {
    const { result } = renderHook(() =>
      useAutoSave({ initialValue: '', onSave: mockSave, delay: 1000 }),
    );

    act(() => result.current.handleChange('a'));
    act(() => vi.advanceTimersByTime(800));
    expect(mockSave).not.toHaveBeenCalled();

    act(() => result.current.handleChange('ab'));
    act(() => vi.advanceTimersByTime(800));
    expect(mockSave).not.toHaveBeenCalled();

    await act(async () => {
      vi.advanceTimersByTime(200);
    });

    expect(mockSave).toHaveBeenCalledTimes(1);
    expect(mockSave).toHaveBeenCalledWith('ab');
  });

  it('re-schedules save when typing during an active save', async () => {
    let resolveSave!: () => void;
    mockSave.mockImplementation(
      () => new Promise<void>((r) => (resolveSave = r)),
    );

    const { result } = renderHook(() =>
      useAutoSave({ initialValue: '', onSave: mockSave, delay: 500 }),
    );

    act(() => result.current.handleChange('first'));
    await act(async () => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current.saveStatus).toBe('saving');

    act(() => result.current.handleChange('second'));
    expect(result.current.saveStatus).toBe('saving');

    await act(async () => resolveSave());
    expect(result.current.saveStatus).toBe('unsaved');

    mockSave.mockImplementation(
      () => new Promise<void>((r) => (resolveSave = r)),
    );
    await act(async () => {
      vi.advanceTimersByTime(500);
    });
    expect(mockSave).toHaveBeenCalledWith('second');

    await act(async () => resolveSave());
    expect(result.current.saveStatus).toBe('idle');
  });

  it('re-schedules save on error', async () => {
    mockSave
      .mockRejectedValueOnce(new Error('network'))
      .mockResolvedValueOnce(undefined);

    const { result } = renderHook(() =>
      useAutoSave({ initialValue: '', onSave: mockSave, delay: 500 }),
    );

    act(() => result.current.handleChange('retry me'));

    await act(async () => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current.saveStatus).toBe('unsaved');

    await act(async () => {
      vi.advanceTimersByTime(500);
    });
    expect(mockSave).toHaveBeenCalledTimes(2);
    expect(result.current.saveStatus).toBe('idle');
  });

  it('flushes dirty value on unmount', () => {
    const { result, unmount } = renderHook(() =>
      useAutoSave({ initialValue: '', onSave: mockSave, delay: 2000 }),
    );

    act(() => result.current.handleChange('unsaved on unmount'));
    expect(mockSave).not.toHaveBeenCalled();

    unmount();
    expect(mockSave).toHaveBeenCalledWith('unsaved on unmount');
  });
});
