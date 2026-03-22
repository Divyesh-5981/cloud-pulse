import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { memo, useCallback } from 'react';

import { type Role, ROLES } from '@/types';

import { roleSwitcherStyles } from './Header.styles';

const ROLE_OPTIONS: Role[] = [ROLES.ADMIN, ROLES.OPERATOR, ROLES.VIEWER];

interface RoleSwitcherProps {
  activeRole: Role;
  onRoleChange: (role: Role) => void;
}

export default memo(function RoleSwitcher({
  activeRole,
  onRoleChange,
}: RoleSwitcherProps) {
  const handleChange = useCallback(
    (_: React.MouseEvent<HTMLElement>, newRole: Role | null) => {
      if (newRole) onRoleChange(newRole);
    },
    [onRoleChange],
  );

  return (
    <ToggleButtonGroup
      value={activeRole}
      exclusive
      onChange={handleChange}
      size="small"
      aria-label="Switch user role"
      sx={roleSwitcherStyles.group}
    >
      {ROLE_OPTIONS.map((role) => (
        <ToggleButton key={role} value={role}>
          {role}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
});
