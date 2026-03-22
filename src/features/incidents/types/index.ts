export const SEVERITY = {
  CRITICAL: 'Critical',
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
} as const;

export type Severity = (typeof SEVERITY)[keyof typeof SEVERITY];

export const INCIDENT_STATUS = {
  OPEN: 'Open',
  ACKNOWLEDGED: 'Acknowledged',
  RESOLVED: 'Resolved',
} as const;

export type IncidentStatus =
  (typeof INCIDENT_STATUS)[keyof typeof INCIDENT_STATUS];

export interface Incident {
  id: string;
  title: string;
  description: string;
  serviceName: string;
  severity: Severity;
  status: IncidentStatus;
  assignee: string;
  createdAt: string;
  updatedAt: string;
  notes: string;
}

export type ColumnType =
  | 'text'
  | 'link'
  | 'chip'
  | 'badge'
  | 'statusChip'
  | 'relativeTime';

export interface ColumnConfig {
  id: keyof Incident;
  label: string;
  type: ColumnType;
  minWidth?: number;
}

export type FilterType = 'multi-select' | 'single-select';

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  id: string;
  label: string;
  type: FilterType;
  options: FilterOption[];
}

export type FilterValues = Record<string, string[]>;

export interface PaginationConfig {
  pageSize: number;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  totalCount: number;
}
