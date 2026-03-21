import { type SxProps, type Theme } from '@mui/material/styles';

export const styles = {
  card: {
    p: 2.5,
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5,
    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },

  serviceName: {
    fontWeight: 700,
    fontSize: '1.05rem',
    lineHeight: 1.3,
  },

  uptime: {
    color: 'text.secondary',
    fontSize: '0.95rem',
    fontWeight: 500,
  },

  incidentCount: {
    color: 'text.secondary',
    fontSize: '0.875rem',
  },
} satisfies Record<string, SxProps<Theme>>;
