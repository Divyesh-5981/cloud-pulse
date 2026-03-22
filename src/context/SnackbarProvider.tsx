import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { type ReactNode, useCallback, useMemo, useRef, useState } from 'react';

import {
  SnackbarContext,
  type SnackbarContextValue,
  type SnackbarSeverity,
} from './SnackbarContext';

interface SnackbarItem {
  message: string;
  severity: SnackbarSeverity;
}

const AUTO_HIDE_MS = 3000;

interface SnackbarProviderProps {
  children: ReactNode;
}

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<SnackbarItem | null>(null);
  const queueRef = useRef<SnackbarItem[]>([]);

  const processQueue = useCallback(() => {
    if (queueRef.current.length > 0) {
      setCurrent(queueRef.current.shift()!);
      setOpen(true);
    }
  }, []);

  const showSnackbar: SnackbarContextValue['showSnackbar'] = useCallback(
    (message, severity = 'success') => {
      queueRef.current.push({ message, severity });
      if (!open) {
        processQueue();
      } else {
        setOpen(false);
      }
    },
    [open, processQueue],
  );

  const handleClose = useCallback(
    (_event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') return;
      setOpen(false);
    },
    [],
  );

  const handleExited = useCallback(() => {
    processQueue();
  }, [processQueue]);

  const value = useMemo(() => ({ showSnackbar }), [showSnackbar]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={AUTO_HIDE_MS}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        slotProps={{ transition: { onExited: handleExited } }}
      >
        <Alert
          onClose={handleClose}
          severity={current?.severity ?? 'success'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {current?.message ?? ''}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
