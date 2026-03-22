import { useCallback, useEffect, useRef, useState } from 'react';

export type SaveStatus = 'idle' | 'unsaved' | 'saving';

interface UseAutoSaveParams {
  initialValue: string;
  onSave: (value: string) => Promise<unknown>;
  delay?: number;
}

interface UseAutoSaveReturn {
  value: string;
  saveStatus: SaveStatus;
  handleChange: (newValue: string) => void;
}

const DEFAULT_DELAY = 2000;

export function useAutoSave({
  initialValue,
  onSave,
  delay = DEFAULT_DELAY,
}: UseAutoSaveParams): UseAutoSaveReturn {
  const [value, setValue] = useState(initialValue);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

  const latestValueRef = useRef(value);
  const dirtyRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savingRef = useRef(false);
  const onSaveRef = useRef(onSave);
  const scheduleRef = useRef<() => void>(() => {});

  useEffect(() => {
    onSaveRef.current = onSave;
  }, [onSave]);

  useEffect(() => {
    latestValueRef.current = value;
  }, [value]);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const executeSave = useCallback(() => {
    const textToSave = latestValueRef.current;
    savingRef.current = true;
    dirtyRef.current = false;
    setSaveStatus('saving');

    onSaveRef.current(textToSave).then(
      () => {
        savingRef.current = false;

        if (dirtyRef.current) {
          setSaveStatus('unsaved');
          scheduleRef.current();
        } else {
          setSaveStatus('idle');
        }
      },
      () => {
        savingRef.current = false;
        setSaveStatus('unsaved');
        scheduleRef.current();
      },
    );
  }, []);

  const scheduleSave = useCallback(() => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      executeSave();
    }, delay);
  }, [delay, executeSave, clearTimer]);

  useEffect(() => {
    scheduleRef.current = scheduleSave;
  }, [scheduleSave]);

  const handleChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
      dirtyRef.current = true;

      if (savingRef.current) {
        return;
      }

      setSaveStatus('unsaved');
      scheduleSave();
    },
    [scheduleSave],
  );

  useEffect(() => {
    return () => {
      clearTimer();
      if (dirtyRef.current) {
        onSaveRef.current(latestValueRef.current).catch(() => {});
      }
    };
  }, [clearTimer]);

  return { value, saveStatus, handleChange };
}
