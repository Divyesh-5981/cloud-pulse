import { type ReactNode, useCallback, useMemo, useState } from 'react';

import { ROLE_PERMISSIONS } from '@/config/roles.config';
import { MOCK_USERS } from '@/graphql/mock/users';
import { type Role, ROLES } from '@/types';

import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [role, setRole] = useState<Role>(ROLES.ADMIN);

  const handleSetRole = useCallback((newRole: Role) => {
    setRole(newRole);
  }, []);

  const value = useMemo(() => {
    const { id, name, initials } = MOCK_USERS[role];
    return {
      user: { id, name, initials },
      role,
      permissions: ROLE_PERMISSIONS[role],
      setRole: handleSetRole,
    };
  }, [role, handleSetRole]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
