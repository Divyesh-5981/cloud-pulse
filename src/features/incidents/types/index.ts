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
