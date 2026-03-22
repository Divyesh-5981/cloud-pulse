import { type SxProps, type Theme } from '@mui/material/styles';

export const styles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2.5,
    pt: 1,
  },
} satisfies Record<string, SxProps<Theme>>;
