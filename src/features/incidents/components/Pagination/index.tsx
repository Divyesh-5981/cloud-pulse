import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { memo } from 'react';

import { styles } from './Pagination.styles';

interface PaginationProps {
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

export default memo(function Pagination({
  page,
  pageSize,
  totalCount,
  onPageChange,
}: PaginationProps) {
  if (totalCount === 0) return null;

  const totalPages = Math.ceil(totalCount / pageSize);
  const rangeStart = (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, totalCount);

  const isFirstPage = page === 1;
  const isLastPage = page >= totalPages;

  return (
    <Box sx={styles.root}>
      <Typography sx={styles.summary}>
        Showing {rangeStart}–{rangeEnd} of {totalCount}
      </Typography>

      <Box sx={styles.pageControls}>
        <IconButton
          size="small"
          disabled={isFirstPage}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeftIcon fontSize="small" />
        </IconButton>

        <Typography sx={styles.pageInfo}>
          Page {page} of {totalPages}
        </Typography>

        <IconButton
          size="small"
          disabled={isLastPage}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <ChevronRightIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
});
