import { type ReactNode, useMemo } from 'react';

import { ROLE_PERMISSIONS } from '@/config/roles.config';
import { CURRENT_MOCK_USER } from '@/graphql/mock/users';

import { AuthContext } from './auth-context';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { id, name, initials, role } = CURRENT_MOCK_USER;

  const value = useMemo(
    () => ({
      user: { id, name, initials },
      role,
      permissions: ROLE_PERMISSIONS[role],
    }),
    [id, name, initials, role],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
