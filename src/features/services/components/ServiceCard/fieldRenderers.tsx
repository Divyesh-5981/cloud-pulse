/**
 * Field renderer registry — maps CardFieldType to render functions.
 *
 * To add a new field type:
 *   1. Add the type to CardFieldType union in types/index.ts
 *   2. Add its renderer here
 *   3. Add the config entry in config.ts → SERVICE_CARD_FIELDS
 */
import Typography from '@mui/material/Typography';
import { type ReactNode } from 'react';

import { type CardFieldType, type Service } from '../../types';
import { formatUptime } from '../../utils';
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

  incidents: (service) => (
    <Typography sx={styles.incidentCount}>
      Incidents: {service.openIncidentCount}
    </Typography>
  ),
};
