import { type SxProps, type Theme } from '@mui/material/styles';

import { palette, shadow } from '@/shared/tokens';

export const styles = {
  tableContainer: {
    border: `1px solid ${palette.border.light}`,
    boxShadow: shadow.subtle,
    borderRadius: 0,
    overflow: 'hidden',
  },

  table: {
    minWidth: 800,
  },

  headerCell: {
    fontWeight: 700,
    fontSize: '0.8rem',
    color: 'text.secondary',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    bgcolor: 'grey.50',
    borderBottom: `2px solid ${palette.border.light}`,
    py: 1.5,
  },

  bodyCell: {
    py: 1.5,
  },
} satisfies Record<string, SxProps<Theme>>;
