import Typography from '@mui/material/Typography';
import { type ReactNode } from 'react';

import { type CardFieldType, type Service } from '../../types';
import { formatLastChecked, formatUptime } from '../../utils';
import StatusBadge from '../StatusBadge';
import { styles } from './ServiceCard.styles';

type FieldRenderer = (service: Service) => ReactNode;

export const fieldRenderers: Record<CardFieldType, FieldRenderer> = {
  badge: (service) => <StatusBadge status={service.status} />,

  uptime: (service) => (
    <Typography sx={styles.uptime}>
      {formatUptime(service.uptimePercent)}
    </Typography>
  ),

  lastChecked: (service) => (
    <Typography sx={styles.lastChecked}>
      Checked {formatLastChecked(service.lastCheckedAt)}
    </Typography>
  ),

  incidents: (service) => (
    <Typography sx={styles.incidentCount}>
      Incidents: {service.openIncidentCount}
    </Typography>
  ),
};
