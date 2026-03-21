export const ROLES = {
  ADMIN: 'Admin',
  OPERATOR: 'Operator',
  VIEWER: 'Viewer',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

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
