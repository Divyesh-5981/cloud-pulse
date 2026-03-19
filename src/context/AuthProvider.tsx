import { type ReactNode, useMemo, useState } from 'react';

import { ROLE_PERMISSIONS } from '@/config/roles.config';
import { type Role, ROLES } from '@/types';

import { AuthContext } from './auth-context';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [role, setRole] = useState<Role>(ROLES.ADMIN);

  const value = useMemo(
    () => ({
      role,
      setRole,
      permissions: ROLE_PERMISSIONS[role],
    }),
    [role],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
