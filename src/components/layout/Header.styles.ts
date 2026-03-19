import { type SxProps, type Theme } from '@mui/material/styles';

import {
  gradient,
  overlay,
  palette,
  radius,
  shadow,
  sizing,
} from '@/app/tokens';

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

  roleSelect: {
    color: overlay.white.high,
    fontSize: '0.85rem',
    height: sizing.controlHeight,
    borderRadius: radius.md,
    '.MuiOutlinedInput-notchedOutline': {
      borderColor: overlay.white.low,
      borderRadius: radius.md,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: overlay.white.medium,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: overlay.white.high,
    },
    '.MuiSvgIcon-root': {
      color: overlay.white.medium,
      fontSize: 18,
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
