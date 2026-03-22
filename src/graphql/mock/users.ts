import { type Role, ROLES } from '@/types';

export interface MockUser {
  id: string;
  name: string;
  initials: string;
}

export const MOCK_USERS: Record<Role, MockUser> = {
  [ROLES.ADMIN]: {
    id: 'usr_admin_01',
    name: 'Alice Morgan',
    initials: 'AM',
  },
  [ROLES.OPERATOR]: {
    id: 'usr_operator_01',
    name: 'Bob Chen',
    initials: 'BC',
  },
  [ROLES.VIEWER]: {
    id: 'usr_viewer_01',
    name: 'Carol Davis',
    initials: 'CD',
  },
};
