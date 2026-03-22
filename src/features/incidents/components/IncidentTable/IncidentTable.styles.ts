import { type SxProps, type Theme } from '@mui/material/styles';

import {
  incidentStatusColors,
  palette,
  radius,
  severityColors,
  shadow,
} from '@/shared/tokens';

import { type IncidentStatus, type Severity } from '../../types';

export const styles = {
  tableContainer: {
    border: `1px solid ${palette.border.light}`,
    boxShadow: shadow.subtle,
    borderRadius: 0,
    overflow: 'auto',
  },

  table: {
    minWidth: 800,
  },

  headerCell: {
    fontWeight: 700,
    fontSize: '0.8rem',
    color: 'text.secondary',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    whiteSpace: 'nowrap',
    bgcolor: 'grey.50',
    borderBottom: `2px solid ${palette.border.light}`,
    py: 1.5,
  },

  bodyRow: {
    '&:last-child td': { borderBottom: 0 },
    '&:hover': { bgcolor: 'action.hover' },
    transition: 'background-color 0.15s ease',
  },

  bodyCell: {
    fontSize: '0.875rem',
    py: 1.5,
  },

  textCell: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: 200,
  },

  linkButton: {
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    color: 'primary.main',
    fontWeight: 600,
    fontSize: '0.875rem',
    textAlign: 'left' as const,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
    '&:focus-visible': {
      outline: '2px solid',
      outlineColor: 'primary.main',
      outlineOffset: 2,
      borderRadius: 0.5,
    },
  },

  serviceChip: {
    fontWeight: 500,
    fontSize: '0.8rem',
    height: 26,
    borderRadius: radius.sm,
  },

  badgeWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 0.75,
  },

  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    flexShrink: 0,
  },

  badgeLabel: {
    fontSize: '0.85rem',
    fontWeight: 600,
  },

  statusLabel: {
    fontSize: '0.85rem',
    fontWeight: 500,
  },

  relativeTime: {
    fontSize: '0.85rem',
    color: 'text.secondary',
  },

  emptyRow: {
    '&:hover': { bgcolor: 'transparent' },
  },

  emptyCell: {
    textAlign: 'center',
    py: 6,
    color: 'text.secondary',
    fontSize: '0.9rem',
  },
} satisfies Record<string, SxProps<Theme>>;

export const severityDotColor: Record<Severity, string> = {
  Critical: severityColors.Critical,
  High: severityColors.High,
  Medium: severityColors.Medium,
  Low: severityColors.Low,
};

export const statusDotColor: Record<IncidentStatus, string> = {
  Open: incidentStatusColors.Open,
  Acknowledged: incidentStatusColors.Acknowledged,
  Resolved: incidentStatusColors.Resolved,
};
