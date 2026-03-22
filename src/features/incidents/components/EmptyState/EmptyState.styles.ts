import { type SxProps, type Theme } from '@mui/material/styles';

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    py: 8,
    px: 3,
  },

  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: '50%',
    bgcolor: 'grey.100',
    mb: 1,
  },

  icon: {
    fontSize: 40,
    color: 'text.disabled',
  },

  title: {
    fontSize: '1.15rem',
    fontWeight: 700,
    color: 'text.primary',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: '0.9rem',
    color: 'text.secondary',
    textAlign: 'center',
  },

  clearButton: {
    fontSize: '0.85rem',
    fontWeight: 500,
    textTransform: 'none',
  },
} satisfies Record<string, SxProps<Theme>>;
