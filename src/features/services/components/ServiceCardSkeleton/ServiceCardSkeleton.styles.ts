import { type SxProps, type Theme } from '@mui/material/styles';

import { radius } from '@/shared/tokens';

export const styles = {
  card: {
    p: 2.5,
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5,
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },

  badge: {
    borderRadius: `${radius.sm}px`,
  },
} satisfies Record<string, SxProps<Theme>>;
