import {
  type ActionConfig,
  type ColumnConfig,
  type FilterConfig,
  INCIDENT_STATUS,
  type PaginationConfig,
  SEVERITY,
} from './types';

export const INCIDENT_COLUMNS: ColumnConfig[] = [
  { id: 'id', label: 'ID', type: 'text', minWidth: 90 },
  { id: 'title', label: 'Title', type: 'link', minWidth: 180 },
  { id: 'serviceName', label: 'Service', type: 'chip', minWidth: 120 },
  { id: 'severity', label: 'Severity', type: 'badge', minWidth: 110 },
  { id: 'status', label: 'Status', type: 'statusChip', minWidth: 130 },
  { id: 'assignee', label: 'Assignee', type: 'text', minWidth: 120 },
  { id: 'createdAt', label: 'Created', type: 'relativeTime', minWidth: 120 },
];

export const INCIDENT_FILTERS: FilterConfig[] = [
  {
    id: 'severity',
    label: 'Severity',
    type: 'multi-select',
    options: Object.values(SEVERITY).map((v) => ({ value: v, label: v })),
  },
  {
    id: 'status',
    label: 'Status',
    type: 'multi-select',
    options: Object.values(INCIDENT_STATUS).map((v) => ({
      value: v,
      label: v,
    })),
  },
  {
    id: 'serviceName',
    label: 'Service',
    type: 'single-select',
    options: [],
  },
];

export const INCIDENT_ACTIONS: ActionConfig[] = [
  {
    id: 'acknowledge',
    label: 'Acknowledge',
    targetStatus: INCIDENT_STATUS.ACKNOWLEDGED,
    permissionKey: 'canAcknowledge',
    allowedFromStatuses: [INCIDENT_STATUS.OPEN],
    variant: 'outlined',
  },
  {
    id: 'resolve',
    label: 'Resolve',
    targetStatus: INCIDENT_STATUS.RESOLVED,
    permissionKey: 'canResolve',
    allowedFromStatuses: [INCIDENT_STATUS.OPEN, INCIDENT_STATUS.ACKNOWLEDGED],
    variant: 'contained',
    color: 'success',
  },
];

export const INCIDENT_PAGINATION: PaginationConfig = {
  pageSize: 10,
};

export function getDefaultFilterValues(): Record<string, string[]> {
  return Object.fromEntries(INCIDENT_FILTERS.map((f) => [f.id, []]));
}
