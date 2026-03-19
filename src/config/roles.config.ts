import { type Role, type RolePermissions, ROLES } from '@/types';

export const ROLE_PERMISSIONS: Record<Role, RolePermissions> = {
  [ROLES.ADMIN]: {
    canViewIncidents: true,
    canAcknowledge: true,
    canResolve: true,
    canCreateIncident: true,
  },
  [ROLES.OPERATOR]: {
    canViewIncidents: true,
    canAcknowledge: true,
    canResolve: true,
    canCreateIncident: false,
  },
  [ROLES.VIEWER]: {
    canViewIncidents: false,
    canAcknowledge: false,
    canResolve: false,
    canCreateIncident: false,
  },
};
