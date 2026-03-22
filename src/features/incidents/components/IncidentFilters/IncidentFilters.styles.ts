import { type SxProps, type Theme } from '@mui/material/styles';

export const styles = {
  controlsRow: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 1.5,
  },

  autocomplete: {
    minWidth: 180,
    maxWidth: 240,
    '& .MuiOutlinedInput-root': {
      py: 0.5,
      fontSize: '0.875rem',
    },
    '& .MuiInputLabel-root': {
      fontSize: '0.875rem',
    },
  },

  clearAllButton: {
    fontSize: '0.8rem',
    fontWeight: 500,
    textTransform: 'none',
    minWidth: 'auto',
    px: 1,
  },
} satisfies Record<string, SxProps<Theme>>;
