import { type SxProps, type Theme } from '@mui/material/styles';

import { statusColors } from '@/shared/tokens';

import { type ServiceStatus } from '../../types';

export const styles = {
  dot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    flexShrink: 0,
  },
} satisfies Record<string, SxProps<Theme>>;

export const dotColorByStatus: Record<ServiceStatus, string> = {
  Healthy: statusColors.Healthy,
  Degraded: statusColors.Degraded,
  Down: statusColors.Down,
};
