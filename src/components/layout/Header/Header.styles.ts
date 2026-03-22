import { type SxProps, type Theme } from '@mui/material/styles';

import {
  gradient,
  overlay,
  palette,
  radius,
  shadow,
  sizing,
} from '@/shared/tokens';

export const styles = {
  appBar: {
    background: gradient.header,
    boxShadow: shadow.header,
  },

  toolbar: {
    gap: { xs: 1, sm: 1.5, md: 2 },
    px: { xs: 1.5, sm: 2, md: 3 },
    py: 1,
    minHeight: sizing.headerMinHeight,
    flexWrap: 'wrap',
  },

  logoIcon: {
    fontSize: { xs: 24, sm: 28 },
    color: overlay.white.high,
    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))',
  },

  title: {
    flexGrow: 1,
    fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' },
    fontWeight: 700,
    letterSpacing: '-0.01em',
    color: overlay.white.high,
  },

  controlsGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: { xs: 0.5, sm: 1, md: 1.5 },
  },

  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },

  avatar: {
    width: 32,
    height: 32,
    fontSize: '0.75rem',
    fontWeight: 600,
    bgcolor: palette.secondary,
    color: overlay.white.high,
  },

  userText: {
    display: { xs: 'none', sm: 'flex' },
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 0.25,
    minWidth: 100,
  },

  userName: {
    color: overlay.white.high,
    fontSize: '0.8rem',
    fontWeight: 600,
    lineHeight: 1.2,
  },

  roleBadge: {
    height: 18,
    fontSize: '0.65rem',
    fontWeight: 600,
    bgcolor: overlay.white.faint,
    color: overlay.white.medium,
    borderRadius: radius.sm,
    '& .MuiChip-label': {
      px: 0.75,
    },
  },

  divider: {
    height: 24,
    borderColor: overlay.white.faint,
    display: { xs: 'none', sm: 'block' },
  },

  autoRefreshGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    bgcolor: overlay.white.faint,
    borderRadius: radius.md,
    px: 1.5,
    py: 0.5,
  },

  autoRefreshLabel: {
    color: overlay.white.medium,
    fontSize: '0.8rem',
    fontWeight: 500,
    display: { xs: 'none', sm: 'block' },
    userSelect: 'none',
  },

  autoRefreshSwitch: {
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: palette.accent.green,
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: palette.accent.green,
    },
  },

  autoRefreshStatus: {
    color: overlay.white.medium,
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.05em',
    minWidth: 24,
    textAlign: 'center',
    userSelect: 'none',
  },

  refreshButton: {
    display: { xs: 'none', md: 'inline-flex' },
    color: overlay.white.high,
    borderColor: overlay.white.low,
    borderRadius: radius.md,
    fontSize: '0.8rem',
    height: sizing.controlHeight,
    '&:hover': {
      borderColor: overlay.white.medium,
      bgcolor: overlay.white.faint,
    },
  },

  refreshIconOnly: {
    display: { xs: 'inline-flex', md: 'none' },
    color: overlay.white.high,
    border: `1px solid ${overlay.white.low}`,
    borderRadius: radius.md,
    width: sizing.controlHeight,
    height: sizing.controlHeight,
    minWidth: sizing.controlHeight,
    '&:hover': {
      borderColor: overlay.white.medium,
      bgcolor: overlay.white.faint,
    },
  },
} satisfies Record<string, SxProps<Theme>>;

export const roleSwitcherStyles = {
  group: {
    bgcolor: overlay.white.faint,
    borderRadius: `${radius.md}px`,
    p: '3px',
    gap: '2px',
    '& .MuiToggleButtonGroup-grouped': {
      border: 'none',
      borderRadius: `${radius.sm}px`,
      color: overlay.white.medium,
      fontSize: '0.7rem',
      fontWeight: 600,
      px: 1.25,
      py: 0.25,
      textTransform: 'none',
      lineHeight: 1.4,
      minWidth: 0,
      '&.Mui-selected': {
        bgcolor: overlay.white.faint,
        color: overlay.white.high,
      },
      '&.Mui-selected:hover': {
        bgcolor: overlay.white.faint,
      },
      '&:hover': {
        bgcolor: 'rgba(255,255,255,0.06)',
      },
    },
  },
} satisfies Record<string, SxProps<Theme>>;
