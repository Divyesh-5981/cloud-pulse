import { type SxProps, type Theme } from '@mui/material/styles';

import { SERVICE_GRID } from '../../config';

const { columns } = SERVICE_GRID;

export const styles = {
  title: {
    fontWeight: 700,
    fontSize: '1.1rem',
    mb: 2,
  },

  grid: {
    display: 'grid',
    gap: 2.5,
    gridTemplateColumns: {
      xs: `repeat(${columns.xs}, 1fr)`,
      sm: `repeat(${columns.sm}, 1fr)`,
      md: `repeat(${columns.md}, 1fr)`,
    },
  },

  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 1,
    mt: 3,
    px: 0.5,
  },

  lastUpdatedGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
  },

  lastUpdatedIcon: {
    fontSize: '1rem',
    color: 'text.secondary',
  },

  lastUpdatedText: {
    color: 'text.secondary',
    fontSize: '0.8rem',
  },

  legend: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },

  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
  },

  legendLabel: {
    fontSize: '0.8rem',
    color: 'text.secondary',
  },

  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    py: 6,
  },

  errorText: {
    color: 'text.secondary',
  },

  emptyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    py: 8,
    px: 3,
  },

  emptyIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: '50%',
    bgcolor: 'grey.100',
    mb: 1,
  },

  emptyIcon: {
    fontSize: 40,
    color: 'text.disabled',
  },

  emptyTitle: {
    fontSize: '1.15rem',
    fontWeight: 700,
    color: 'text.primary',
  },

  emptySubtitle: {
    fontSize: '0.9rem',
    color: 'text.secondary',
  },
} satisfies Record<string, SxProps<Theme>>;
