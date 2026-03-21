/**
 * ServiceCard — renders a single service health card.
 *
 * Header (dot + name) is fixed. Body fields are config-driven via
 * SERVICE_CARD_FIELDS and the fieldRenderers registry.
 *
 * To add a new field, see fieldRenderers.tsx for instructions.
 */
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';

import { SERVICE_CARD_FIELDS } from '../../config';
import { type Service } from '../../types';
import StatusDot from '../StatusDot';
import { fieldRenderers } from './fieldRenderers';
import { styles } from './ServiceCard.styles';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card sx={styles.card}>
      <Box sx={styles.header}>
        <StatusDot status={service.status} />
        <Typography sx={styles.serviceName}>{service.name}</Typography>
      </Box>

      {SERVICE_CARD_FIELDS.map(({ type }) => (
        <Fragment key={type}>{fieldRenderers[type](service)}</Fragment>
      ))}
    </Card>
  );
}
