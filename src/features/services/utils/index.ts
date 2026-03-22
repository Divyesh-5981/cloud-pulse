import { formatDistanceToNow } from 'date-fns';

import { type Service } from '../types';

/**
 * Formats uptime as a display string.
 * @example formatUptime(99.9) → "99.9% Uptime"
 */
export function formatUptime(percent: number): string {
  return `${percent}% Uptime`;
}

/**
 * Formats an ISO date string as a relative time string.
 * @example formatLastChecked("2026-03-21T08:58:00Z") → "2 mins ago"
 */
export function formatLastChecked(isoDate: string): string {
  return formatDistanceToNow(new Date(isoDate), { addSuffix: true });
}

/**
 * Returns the most recent lastCheckedAt time from a list of services.
 * Returns an empty string if the list is empty.
 */
export function getMostRecentCheckTime(services: Service[]): string {
  if (services.length === 0) return '';

  return services.reduce(
    (latest, svc) => (svc.lastCheckedAt > latest ? svc.lastCheckedAt : latest),
    services[0].lastCheckedAt,
  );
}
