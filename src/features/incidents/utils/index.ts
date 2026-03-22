import { formatDistanceToNow } from 'date-fns';

import { incidentStatusColors, severityColors } from '@/shared/tokens';

import { MOCK_INCIDENTS } from '../api/mock-data';
import { INCIDENT_FILTERS } from '../config';
import {
  type FilterConfig,
  type IncidentStatus,
  type Severity,
} from '../types';

const EMPTY_PLACEHOLDER = '—';

export function safeRelativeTime(isoDate: string): string {
  try {
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return EMPTY_PLACEHOLDER;
    return formatDistanceToNow(date, { addSuffix: true });
  } catch {
    return EMPTY_PLACEHOLDER;
  }
}

export function getStatusColor(status: IncidentStatus): string {
  return incidentStatusColors[status] ?? 'grey';
}

export function getSeverityColor(severity: Severity): string {
  return severityColors[severity] ?? 'grey';
}

export function getServiceNames(): string[] {
  return [...new Set(MOCK_INCIDENTS.map((inc) => inc.serviceName))].sort();
}

export function getFiltersWithServiceOptions(): FilterConfig[] {
  const serviceNames = getServiceNames();

  return INCIDENT_FILTERS.map((filter) => {
    if (filter.id === 'serviceName' && filter.options.length === 0) {
      return {
        ...filter,
        options: serviceNames.map((name) => ({ value: name, label: name })),
      };
    }
    return filter;
  });
}
