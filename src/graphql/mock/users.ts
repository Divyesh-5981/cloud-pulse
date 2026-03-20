import { type Role, ROLES } from '@/types';

export interface MockUser {
  id: string;
  name: string;
  initials: string;
  role: Role;
}

export const MOCK_USERS: Record<Role, MockUser> = {
  [ROLES.ADMIN]: {
    id: 'usr_admin_01',
    name: 'Alice Morgan',
    initials: 'AM',
    role: ROLES.ADMIN,
  },
  [ROLES.OPERATOR]: {
    id: 'usr_operator_01',
    name: 'Bob Chen',
    initials: 'BC',
    role: ROLES.OPERATOR,
  },
  [ROLES.VIEWER]: {
    id: 'usr_viewer_01',
    name: 'Carol Davis',
    initials: 'CD',
    role: ROLES.VIEWER,
  },
};

export const CURRENT_MOCK_USER: MockUser = MOCK_USERS[ROLES.ADMIN];
