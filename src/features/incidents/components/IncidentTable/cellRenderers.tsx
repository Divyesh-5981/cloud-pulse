import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { type ReactNode } from 'react';

import {
  type ColumnType,
  type Incident,
  type IncidentStatus,
  type Severity,
} from '../../types';
import { safeRelativeTime } from '../../utils';
import {
  severityDotColor,
  statusDotColor,
  styles,
} from './IncidentTable.styles';

export interface CellRendererContext {
  onTitleClick?: (incident: Incident) => void;
}

type CellRenderer = (
  value: string,
  incident: Incident,
  context: CellRendererContext,
) => ReactNode;

const EMPTY_PLACEHOLDER = '—';

function isEmpty(value: unknown): value is null | undefined | '' {
  return value === null || value === undefined || value === '';
}

const textRenderer: CellRenderer = (value) => (
  <Typography component="span" sx={styles.textCell}>
    {isEmpty(value) ? EMPTY_PLACEHOLDER : value}
  </Typography>
);

const linkRenderer: CellRenderer = (value, incident, { onTitleClick }) => (
  <Box
    component="button"
    onClick={() => onTitleClick?.(incident)}
    sx={styles.linkButton}
  >
    {isEmpty(value) ? EMPTY_PLACEHOLDER : value}
  </Box>
);

const chipRenderer: CellRenderer = (value) =>
  isEmpty(value) ? (
    <Typography component="span">{EMPTY_PLACEHOLDER}</Typography>
  ) : (
    <Chip
      label={value}
      size="small"
      variant="outlined"
      sx={styles.serviceChip}
    />
  );

const badgeRenderer: CellRenderer = (value) => {
  if (isEmpty(value)) {
    return <Typography component="span">{EMPTY_PLACEHOLDER}</Typography>;
  }
  const color = severityDotColor[value as Severity] ?? 'grey';
  return (
    <Box sx={styles.badgeWrapper}>
      <Box sx={{ ...styles.badgeDot, bgcolor: color }} />
      <Typography component="span" sx={styles.badgeLabel}>
        {value}
      </Typography>
    </Box>
  );
};

const statusChipRenderer: CellRenderer = (value) => {
  if (isEmpty(value)) {
    return <Typography component="span">{EMPTY_PLACEHOLDER}</Typography>;
  }
  const color = statusDotColor[value as IncidentStatus] ?? 'grey';
  return (
    <Box sx={styles.badgeWrapper}>
      <Box sx={{ ...styles.badgeDot, bgcolor: color }} />
      <Typography component="span" sx={styles.statusLabel}>
        {value}
      </Typography>
    </Box>
  );
};

const relativeTimeRenderer: CellRenderer = (value) => (
  <Typography component="span" sx={styles.relativeTime}>
    {isEmpty(value) ? EMPTY_PLACEHOLDER : safeRelativeTime(value)}
  </Typography>
);

export const cellRenderers: Record<ColumnType, CellRenderer> = {
  text: textRenderer,
  link: linkRenderer,
  chip: chipRenderer,
  badge: badgeRenderer,
  statusChip: statusChipRenderer,
  relativeTime: relativeTimeRenderer,
};

export function getCellRenderer(type: ColumnType): CellRenderer {
  return cellRenderers[type] ?? cellRenderers.text;
}
