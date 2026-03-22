import { formatDistanceToNow } from 'date-fns';

import { incidentStatusColors, severityColors } from '@/shared/tokens';

import { MOCK_INCIDENTS } from '../api/mock-data';
import { INCIDENT_FILTERS } from '../config';
import {
  type FilterConfig,
  type IncidentStatus,
  type Severity,
} from '../types';

/* ── Formatting helpers ── */

const EMPTY_PLACEHOLDER = '—';

/** Safely formats an ISO date string as a relative time (e.g., "5 minutes ago"). */
export function safeRelativeTime(isoDate: string): string {
  try {
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return EMPTY_PLACEHOLDER;
    return formatDistanceToNow(date, { addSuffix: true });
  } catch {
    return EMPTY_PLACEHOLDER;
  }
}

/* ── Color helpers ── */

export function getStatusColor(status: IncidentStatus): string {
  return incidentStatusColors[status] ?? 'grey';
}

export function getSeverityColor(severity: Severity): string {
  return severityColors[severity] ?? 'grey';
}

/* ── Filter helpers ── */

export function getFiltersWithServiceOptions(): FilterConfig[] {
  const serviceNames = [
    ...new Set(MOCK_INCIDENTS.map((inc) => inc.serviceName)),
  ].sort();

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
