import { type SxProps, type Theme } from '@mui/material/styles';

import { radius } from '@/shared/tokens';

const statusIndicatorBase = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.5,
  fontSize: '0.8rem',
  fontWeight: 500,
} as const;

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  heading: {
    fontSize: '0.95rem',
    fontWeight: 700,
    color: 'text.primary',
  },

  statusIdle: {
    ...statusIndicatorBase,
    color: 'success.main',
  },

  statusUnsaved: {
    ...statusIndicatorBase,
    color: 'text.secondary',
  },

  statusSaving: {
    ...statusIndicatorBase,
    color: 'text.secondary',
  },

  spinner: {
    color: 'text.secondary',
  },

  checkIcon: {
    fontSize: '1rem',
    color: 'success.main',
  },

  textarea: {
    '& .MuiOutlinedInput-root': {
      fontSize: '0.9rem',
      borderRadius: `${radius.sm}px`,
    },
  },
} satisfies Record<string, SxProps<Theme>>;
