import {
  getDefaultFilterValues,
  INCIDENT_ACTIONS,
  INCIDENT_COLUMNS,
  INCIDENT_FILTERS,
  INCIDENT_PAGINATION,
} from '../../config';

describe('Config-driven UI', () => {
  describe('INCIDENT_COLUMNS', () => {
    it('has unique column ids', () => {
      const ids = INCIDENT_COLUMNS.map((c) => c.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('every column has a label and type', () => {
      for (const col of INCIDENT_COLUMNS) {
        expect(col.label).toBeTruthy();
        expect(col.type).toBeTruthy();
      }
    });

    it('includes the required columns: ID, Title, Service, Severity, Status', () => {
      const ids = INCIDENT_COLUMNS.map((c) => c.id);
      expect(ids).toContain('id');
      expect(ids).toContain('title');
      expect(ids).toContain('serviceName');
      expect(ids).toContain('severity');
      expect(ids).toContain('status');
    });

    it('title column uses "link" type for clickable rows', () => {
      const titleCol = INCIDENT_COLUMNS.find((c) => c.id === 'title');
      expect(titleCol?.type).toBe('link');
    });
  });

  describe('INCIDENT_FILTERS', () => {
    it('has unique filter ids', () => {
      const ids = INCIDENT_FILTERS.map((f) => f.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('severity filter has all severity options', () => {
      const sevFilter = INCIDENT_FILTERS.find((f) => f.id === 'severity');
      const values = sevFilter?.options.map((o) => o.value) ?? [];
      expect(values).toEqual(
        expect.arrayContaining(['Critical', 'High', 'Medium', 'Low']),
      );
    });

    it('status filter has all status options', () => {
      const statusFilter = INCIDENT_FILTERS.find((f) => f.id === 'status');
      const values = statusFilter?.options.map((o) => o.value) ?? [];
      expect(values).toEqual(
        expect.arrayContaining(['Open', 'Acknowledged', 'Resolved']),
      );
    });
  });

  describe('INCIDENT_ACTIONS', () => {
    it('has unique action ids', () => {
      const ids = INCIDENT_ACTIONS.map((a) => a.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('each action references a valid permission key', () => {
      const validKeys = [
        'canAcknowledge',
        'canResolve',
        'canCreateIncident',
        'canViewIncidents',
      ];
      for (const action of INCIDENT_ACTIONS) {
        expect(validKeys).toContain(action.permissionKey);
      }
    });

    it('acknowledge targets Acknowledged status from Open', () => {
      const ack = INCIDENT_ACTIONS.find((a) => a.id === 'acknowledge');
      expect(ack?.targetStatus).toBe('Acknowledged');
      expect(ack?.allowedFromStatuses).toEqual(['Open']);
    });

    it('resolve targets Resolved status from Open and Acknowledged', () => {
      const res = INCIDENT_ACTIONS.find((a) => a.id === 'resolve');
      expect(res?.targetStatus).toBe('Resolved');
      expect(res?.allowedFromStatuses).toEqual(
        expect.arrayContaining(['Open', 'Acknowledged']),
      );
    });
  });

  describe('INCIDENT_PAGINATION', () => {
    it('has a positive page size', () => {
      expect(INCIDENT_PAGINATION.pageSize).toBeGreaterThan(0);
    });
  });

  describe('getDefaultFilterValues', () => {
    it('returns empty arrays for each filter id', () => {
      const defaults = getDefaultFilterValues();
      for (const filter of INCIDENT_FILTERS) {
        expect(defaults[filter.id]).toEqual([]);
      }
    });

    it('returns a new object each call (no shared reference)', () => {
      const a = getDefaultFilterValues();
      const b = getDefaultFilterValues();
      expect(a).not.toBe(b);
    });
  });
});
