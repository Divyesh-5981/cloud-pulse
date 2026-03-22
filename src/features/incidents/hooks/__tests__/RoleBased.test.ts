import { ROLE_PERMISSIONS } from '@/config/roles.config';
import { TABS_CONFIG } from '@/config/tabs.config';
import { ROLES } from '@/types';

import { INCIDENT_ACTIONS } from '../../config';
import { type IncidentStatus } from '../../types';

describe('Role-based access control', () => {
  describe('Tab visibility', () => {
    it('Admin sees both Services and Incidents tabs', () => {
      const visible = TABS_CONFIG.filter((t) => t.roles.includes(ROLES.ADMIN));
      const ids = visible.map((t) => t.id);
      expect(ids).toContain('services');
      expect(ids).toContain('incidents');
    });

    it('Operator sees both Services and Incidents tabs', () => {
      const visible = TABS_CONFIG.filter((t) =>
        t.roles.includes(ROLES.OPERATOR),
      );
      const ids = visible.map((t) => t.id);
      expect(ids).toContain('services');
      expect(ids).toContain('incidents');
    });

    it('Viewer sees only Services tab', () => {
      const visible = TABS_CONFIG.filter((t) => t.roles.includes(ROLES.VIEWER));
      const ids = visible.map((t) => t.id);
      expect(ids).toContain('services');
      expect(ids).not.toContain('incidents');
    });
  });

  describe('Permissions', () => {
    it('Admin can acknowledge, resolve, and create incidents', () => {
      const perms = ROLE_PERMISSIONS[ROLES.ADMIN];
      expect(perms.canAcknowledge).toBe(true);
      expect(perms.canResolve).toBe(true);
      expect(perms.canCreateIncident).toBe(true);
    });

    it('Operator can acknowledge but not resolve or create', () => {
      const perms = ROLE_PERMISSIONS[ROLES.OPERATOR];
      expect(perms.canAcknowledge).toBe(true);
      expect(perms.canResolve).toBe(false);
      expect(perms.canCreateIncident).toBe(false);
    });

    it('Viewer has no incident permissions', () => {
      const perms = ROLE_PERMISSIONS[ROLES.VIEWER];
      expect(perms.canViewIncidents).toBe(false);
      expect(perms.canAcknowledge).toBe(false);
      expect(perms.canResolve).toBe(false);
      expect(perms.canCreateIncident).toBe(false);
    });
  });

  describe('Action visibility per role and status', () => {
    function getVisibleActions(
      role: keyof typeof ROLES,
      incidentStatus: IncidentStatus,
    ) {
      const perms = ROLE_PERMISSIONS[ROLES[role]];
      return INCIDENT_ACTIONS.filter(
        (a) =>
          perms[a.permissionKey] &&
          a.allowedFromStatuses.includes(incidentStatus),
      );
    }

    it('Admin sees Acknowledge + Resolve for Open incidents', () => {
      const actions = getVisibleActions('ADMIN', 'Open');
      const ids = actions.map((a) => a.id);
      expect(ids).toEqual(['acknowledge', 'resolve']);
    });

    it('Admin sees only Resolve for Acknowledged incidents', () => {
      const actions = getVisibleActions('ADMIN', 'Acknowledged');
      const ids = actions.map((a) => a.id);
      expect(ids).toEqual(['resolve']);
    });

    it('Admin sees no actions for Resolved incidents', () => {
      const actions = getVisibleActions('ADMIN', 'Resolved');
      expect(actions).toHaveLength(0);
    });

    it('Operator sees only Acknowledge for Open incidents', () => {
      const actions = getVisibleActions('OPERATOR', 'Open');
      const ids = actions.map((a) => a.id);
      expect(ids).toEqual(['acknowledge']);
    });

    it('Operator sees no actions for Acknowledged incidents', () => {
      const actions = getVisibleActions('OPERATOR', 'Acknowledged');
      expect(actions).toHaveLength(0);
    });

    it('Viewer sees no actions regardless of status', () => {
      expect(getVisibleActions('VIEWER', 'Open')).toHaveLength(0);
      expect(getVisibleActions('VIEWER', 'Acknowledged')).toHaveLength(0);
      expect(getVisibleActions('VIEWER', 'Resolved')).toHaveLength(0);
    });
  });
});
