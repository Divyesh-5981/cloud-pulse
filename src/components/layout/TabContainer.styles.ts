import { type SxProps, type Theme } from '@mui/material/styles';

import { shadow } from '@/app/tokens';

export const styles = {
  tabBar: {
    borderBottom: 1,
    borderColor: 'divider',
    bgcolor: 'white',
    boxShadow: shadow.subtle,
    px: { xs: 1, sm: 2, md: 3 },
  },

  tabs: {
    '& .MuiTabs-indicator': {
      height: 3,
      borderRadius: '3px 3px 0 0',
    },
  },

  content: {
    p: { xs: 2, sm: 3 },
  },
} satisfies Record<string, SxProps<Theme>>;
