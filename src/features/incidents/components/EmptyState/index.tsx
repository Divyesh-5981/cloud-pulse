import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { memo } from 'react';

import { styles } from './EmptyState.styles';

interface EmptyStateProps {
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export default memo(function EmptyState({
  hasActiveFilters,
  onClearFilters,
}: EmptyStateProps) {
  if (hasActiveFilters) {
    return (
      <Box sx={styles.root}>
        <Box sx={styles.iconWrapper}>
          <SearchOffIcon sx={styles.icon} />
        </Box>
        <Typography sx={styles.title}>No Incidents Found</Typography>
        <Typography sx={styles.subtitle}>
          No incidents match your filters. Try adjusting or clearing them.
        </Typography>
        <Button
          variant="outlined"
          startIcon={<FilterListOffIcon />}
          onClick={onClearFilters}
          sx={styles.clearButton}
        >
          Clear Filters
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={styles.root}>
      <Box sx={styles.iconWrapper}>
        <SearchOffIcon sx={styles.icon} />
      </Box>
      <Typography sx={styles.title}>No Incidents</Typography>
      <Typography sx={styles.subtitle}>
        There are currently no incidents to display.
      </Typography>
    </Box>
  );
});
