import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import { styles } from './ErrorFallback.styles';

interface ErrorFallbackProps {
  error: unknown;
  resetErrorBoundary: () => void;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  const [showDetails, setShowDetails] = useState(false);
  const message = getErrorMessage(error);

  return (
    <Box role="alert" sx={styles.root}>
      <Box sx={styles.card}>
        <Box sx={styles.iconWrapper}>
          <ErrorOutlineIcon sx={styles.icon} />
        </Box>

        <Typography variant="h6" sx={styles.title}>
          Something went wrong
        </Typography>

        <Typography sx={styles.message}>
          An unexpected error occurred. You can try again, and if the problem
          persists, contact support.
        </Typography>

        <Button
          size="small"
          sx={styles.detailsToggle}
          onClick={() => setShowDetails((prev) => !prev)}
        >
          {showDetails ? 'Hide details' : 'Show details'}
        </Button>
        <Collapse in={showDetails} sx={{ width: '100%' }}>
          <Box sx={styles.details}>{message}</Box>
        </Collapse>

        <Button
          variant="contained"
          startIcon={<ReplayIcon />}
          onClick={resetErrorBoundary}
          disableElevation
          sx={styles.retryButton}
        >
          Try again
        </Button>
      </Box>
    </Box>
  );
}
