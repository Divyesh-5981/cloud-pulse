import { type SxProps, type Theme } from '@mui/material/styles';

import { errorColors, palette, radius, shadow } from '@/app/tokens';

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    bgcolor: palette.background.default,
    p: { xs: 3, sm: 4 },
  },

  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2.5,
    maxWidth: 440,
    width: '100%',
    p: { xs: 4, sm: 5 },
    bgcolor: palette.background.paper,
    borderRadius: `${radius.lg}px`,
    boxShadow: shadow.card,
    border: `1px solid ${palette.border.light}`,
    textAlign: 'center',
  },

  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 64,
    borderRadius: '50%',
    bgcolor: errorColors.surface,
  },

  icon: {
    fontSize: 32,
    color: errorColors.main,
  },

  title: {
    fontWeight: 700,
    fontSize: '1.25rem',
    color: palette.primary.main,
  },

  message: {
    color: 'text.secondary',
    fontSize: '0.875rem',
    lineHeight: 1.6,
    px: 1,
  },

  details: {
    width: '100%',
    mt: 0.5,
    bgcolor: errorColors.detailsBg,
    borderRadius: `${radius.sm}px`,
    p: 2,
    fontFamily: 'monospace',
    fontSize: '0.75rem',
    color: 'text.secondary',
    textAlign: 'left',
    wordBreak: 'break-word',
    maxHeight: 120,
    overflow: 'auto',
  },

  detailsToggle: {
    fontSize: '0.8rem',
    color: 'text.secondary',
    textTransform: 'none',
    fontWeight: 500,
    '&:hover': {
      bgcolor: 'transparent',
      textDecoration: 'underline',
    },
  },

  retryButton: {
    mt: 1,
    px: 4,
    py: 1,
    borderRadius: `${radius.md}px`,
    fontWeight: 600,
    fontSize: '0.9rem',
    textTransform: 'none',
    bgcolor: palette.primary.main,
    color: palette.primary.contrastText,
    '&:hover': {
      bgcolor: palette.primary.light,
    },
  },
} satisfies Record<string, SxProps<Theme>>;
