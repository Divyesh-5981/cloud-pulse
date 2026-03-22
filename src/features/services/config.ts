import {
  type CardFieldConfig,
  SERVICE_STATUS,
  type StatusLegendItem,
} from './types';

export const STATUS_LEGEND: StatusLegendItem[] = [
  { status: SERVICE_STATUS.HEALTHY, label: 'Healthy' },
  { status: SERVICE_STATUS.DEGRADED, label: 'Degraded' },
  { status: SERVICE_STATUS.DOWN, label: 'Down' },
];

export const SERVICE_GRID = {
  title: 'Service Health Overview',
  skeletonCount: 4,
  columns: { xs: 1, sm: 2, md: 4 },
} as const;

export const SERVICE_CARD_FIELDS: CardFieldConfig[] = [
  { type: 'badge' },
  { type: 'uptime' },
  { type: 'lastChecked' },
  { type: 'incidents' },
];
