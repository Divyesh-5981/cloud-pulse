import { type Incident, INCIDENT_STATUS, type Severity } from '../types';
import { MOCK_INCIDENTS } from './mock-data';

type ResolverFn = (variables: Record<string, unknown>) => unknown;

/* ── Filter helpers ── */

function matchesArrayFilter(value: string, filter: unknown): boolean {
  if (!Array.isArray(filter) || filter.length === 0) return true;
  return (filter as string[]).includes(value);
}

function matchesStringFilter(value: string, filter: unknown): boolean {
  if (typeof filter !== 'string' || filter === '') return true;
  return value === filter;
}

function applyFilters(
  incidents: Incident[],
  variables: Record<string, unknown>,
): Incident[] {
  return incidents.filter(
    (inc) =>
      matchesArrayFilter(inc.severity, variables.severity) &&
      matchesArrayFilter(inc.status, variables.status) &&
      matchesStringFilter(inc.serviceName, variables.serviceName),
  );
}

/* ── Pagination helper ── */

function paginate(
  items: Incident[],
  page: number,
  pageSize: number,
): Incident[] {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

/* ── ID generation helper ── */

function nextIncidentId(): string {
  const maxNum = MOCK_INCIDENTS.reduce((max, inc) => {
    const num = parseInt(inc.id.replace('INC-', ''), 10);
    return num > max ? num : max;
  }, 0);
  return `INC-${maxNum + 1}`;
}

/* ── Resolver map ── */

export const incidentMockResolvers: Record<string, ResolverFn> = {
  GetIncidents: (variables) => {
    const page = (variables.page as number) || 1;
    const pageSize = (variables.pageSize as number) || 10;

    const filtered = applyFilters(MOCK_INCIDENTS, variables);

    return {
      incidents: {
        items: paginate(filtered, page, pageSize),
        totalCount: filtered.length,
      },
    };
  },

  UpdateIncidentNotes: (variables) => {
    const id = variables.id as string;
    const notes = variables.notes as string;

    const incident = MOCK_INCIDENTS.find((inc) => inc.id === id);
    if (!incident) {
      throw new Error(`Incident "${id}" not found`);
    }

    incident.notes = notes;
    incident.updatedAt = new Date().toISOString();

    return {
      updateIncidentNotes: {
        id: incident.id,
        notes: incident.notes,
        updatedAt: incident.updatedAt,
      },
    };
  },

  UpdateIncidentStatus: (variables) => {
    const id = variables.id as string;
    const status = variables.status as string;

    const incident = MOCK_INCIDENTS.find((inc) => inc.id === id);
    if (!incident) {
      throw new Error(`Incident "${id}" not found`);
    }

    incident.status = status as Incident['status'];
    incident.updatedAt = new Date().toISOString();

    return {
      updateIncidentStatus: {
        id: incident.id,
        status: incident.status,
        updatedAt: incident.updatedAt,
      },
    };
  },

  CreateIncident: (variables) => {
    const now = new Date().toISOString();
    const newIncident: Incident = {
      id: nextIncidentId(),
      title: variables.title as string,
      description: variables.description as string,
      serviceName: variables.serviceName as string,
      severity: variables.severity as Severity,
      status: INCIDENT_STATUS.OPEN,
      assignee: variables.assignee as string,
      createdAt: now,
      updatedAt: now,
      notes: '',
    };

    MOCK_INCIDENTS.unshift(newIncident);

    return { createIncident: newIncident };
  },
};
