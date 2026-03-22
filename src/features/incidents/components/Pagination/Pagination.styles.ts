import { type SxProps, type Theme } from '@mui/material/styles';

export const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    px: 2,
    py: 1.5,
  },

  summary: {
    fontSize: '0.85rem',
    color: 'text.secondary',
    fontWeight: 500,
  },

  pageControls: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },

  pageInfo: {
    fontSize: '0.85rem',
    color: 'text.secondary',
    fontWeight: 500,
    minWidth: 80,
    textAlign: 'center',
  },
} satisfies Record<string, SxProps<Theme>>;
