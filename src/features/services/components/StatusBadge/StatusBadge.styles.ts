import { type SxProps, type Theme } from '@mui/material/styles';

import { radius, statusBackgroundColors, statusColors } from '@/shared/tokens';

import { type ServiceStatus } from '../../types';

const baseChip: SxProps<Theme> = {
  fontWeight: 600,
  fontSize: '0.75rem',
  borderRadius: radius.sm,
  height: 24,
  '& .MuiChip-label': {
    px: 1,
  },
};

export const chipByStatus: Record<ServiceStatus, SxProps<Theme>> = {
  Healthy: {
    ...baseChip,
    bgcolor: statusBackgroundColors.Healthy,
    color: statusColors.Healthy,
  },
  Degraded: {
    ...baseChip,
    bgcolor: statusBackgroundColors.Degraded,
    color: statusColors.Degraded,
  },
  Down: {
    ...baseChip,
    bgcolor: statusBackgroundColors.Down,
    color: statusColors.Down,
  },
};
