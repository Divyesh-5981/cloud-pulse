export const ROLES = {
  ADMIN: 'Admin',
  OPERATOR: 'Operator',
  VIEWER: 'Viewer',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const SERVICE_STATUS = {
  HEALTHY: 'Healthy',
  DEGRADED: 'Degraded',
  DOWN: 'Down',
} as const;

export type ServiceStatus =
  (typeof SERVICE_STATUS)[keyof typeof SERVICE_STATUS];

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

export interface RolePermissions {
  canViewIncidents: boolean;
  canAcknowledge: boolean;
  canResolve: boolean;
  canCreateIncident: boolean;
}

export interface AuthContextValue {
  user: {
    id: string;
    name: string;
    initials: string;
  };
  role: Role;
  permissions: RolePermissions;
}
