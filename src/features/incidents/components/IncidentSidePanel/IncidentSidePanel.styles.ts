import { type SxProps, type Theme } from '@mui/material/styles';

import { palette, shadow } from '@/shared/tokens';

export const DRAWER_WIDTH = 420;

export const styles = {
  drawer: {
    '& .MuiDrawer-paper': {
      width: { xs: '100%', sm: DRAWER_WIDTH },
      boxShadow: shadow.header,
    },
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    px: 3,
    py: 2,
    borderBottom: `1px solid ${palette.border.light}`,
    flexShrink: 0,
  },

  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    minWidth: 0,
  },

  incidentId: {
    fontSize: '0.95rem',
    fontWeight: 700,
    color: 'text.primary',
    whiteSpace: 'nowrap',
  },

  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 0.75,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    flexShrink: 0,
  },

  statusLabel: {
    fontSize: '0.85rem',
    fontWeight: 600,
  },

  body: {
    flex: 1,
    overflowY: 'auto',
    px: 3,
    py: 2.5,
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },

  title: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: 'text.primary',
    lineHeight: 1.3,
  },

  detailsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5,
  },

  detailRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    minHeight: 28,
  },

  detailLabel: {
    fontSize: '0.85rem',
    color: 'text.secondary',
    fontWeight: 500,
    minWidth: 90,
    flexShrink: 0,
  },

  detailValue: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.75,
    fontSize: '0.9rem',
    fontWeight: 500,
    color: 'text.primary',
    minWidth: 0,
  },

  detailIcon: {
    fontSize: '1rem',
    color: 'text.secondary',
    flexShrink: 0,
  },

  severityDot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    flexShrink: 0,
  },

  severityText: {
    fontWeight: 600,
  },

  sectionHeading: {
    fontSize: '0.95rem',
    fontWeight: 700,
    color: 'text.primary',
    mb: 0.75,
  },

  descriptionText: {
    fontSize: '0.9rem',
    color: 'text.secondary',
    lineHeight: 1.6,
  },
} satisfies Record<string, SxProps<Theme>>;

export function statusDotSx(color: string): SxProps<Theme> {
  return { ...styles.statusDot, bgcolor: color };
}

export function severityDotSx(color: string): SxProps<Theme> {
  return { ...styles.severityDot, bgcolor: color };
}

export function severityTextSx(color: string): SxProps<Theme> {
  return { ...styles.severityText, color };
}
