import { type SxProps, type Theme } from '@mui/material/styles';

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },

  toolbar: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 2,
    flexWrap: 'wrap',
  },

  newIncidentButton: {
    textTransform: 'none',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    flexShrink: 0,
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
} satisfies Record<string, SxProps<Theme>>;
