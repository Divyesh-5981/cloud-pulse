import { type Role, ROLES } from '@/types';

export const TAB_IDS = {
  SERVICES: 'services',
  INCIDENTS: 'incidents',
} as const;

export type TabId = (typeof TAB_IDS)[keyof typeof TAB_IDS];

export interface TabConfig {
  id: TabId;
  label: string;
  roles: Role[];
}

export const TABS_CONFIG: TabConfig[] = [
  {
    id: TAB_IDS.SERVICES,
    label: 'Services',
    roles: [ROLES.ADMIN, ROLES.OPERATOR, ROLES.VIEWER],
  },
  {
    id: TAB_IDS.INCIDENTS,
    label: 'Incidents',
    roles: [ROLES.ADMIN, ROLES.OPERATOR],
  },
];

const ROLES_IN_CONFIG = new Set(TABS_CONFIG.flatMap((tab) => tab.roles));

export function assertTabCoverage(role: string): void {
  if (!ROLES_IN_CONFIG.has(role as Role)) {
    throw new Error(`No tabs configured for role "${role}".`);
  }
}
