import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ReplayIcon from '@mui/icons-material/Replay';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';

import { SERVICE_GRID, STATUS_LEGEND } from '../../config';
import { useServices } from '../../hooks/useServices';
import { formatLastChecked, getMostRecentCheckTime } from '../../utils';
import ServiceCard from '../ServiceCard';
import ServiceCardSkeleton from '../ServiceCardSkeleton';
import StatusDot from '../StatusDot';
import { styles } from './ServiceGrid.styles';

function SkeletonGrid() {
  return (
    <Box sx={styles.grid}>
      {Array.from({ length: SERVICE_GRID.skeletonCount }, (_, i) => (
        <ServiceCardSkeleton key={i} />
      ))}
    </Box>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <Box sx={styles.errorContainer}>
      <Typography sx={styles.errorText}>
        Failed to load services. Please try again.
      </Typography>
      <Button variant="outlined" startIcon={<ReplayIcon />} onClick={onRetry}>
        Retry
      </Button>
    </Box>
  );
}

function ServiceFooter({ lastCheckedAt }: { lastCheckedAt: string }) {
  return (
    <Box sx={styles.footer}>
      <Box sx={styles.lastUpdatedGroup}>
        <AccessTimeIcon sx={styles.lastUpdatedIcon} />
        <Typography sx={styles.lastUpdatedText}>
          Last updated: {formatLastChecked(lastCheckedAt)}
        </Typography>
      </Box>

      <Box sx={styles.legend}>
        {STATUS_LEGEND.map(({ status, label }) => (
          <Box key={status} sx={styles.legendItem}>
            <StatusDot status={status} />
            <Typography sx={styles.legendLabel}>{label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function ServiceGrid() {
  const { services, loading, error, refetch } = useServices();

  const isInitialLoad = loading && services.length === 0;
  const hasError = error && services.length === 0;

  const lastChecked = useMemo(
    () => getMostRecentCheckTime(services),
    [services],
  );

  return (
    <Box>
      <Typography sx={styles.title}>{SERVICE_GRID.title}</Typography>

      {isInitialLoad && <SkeletonGrid />}

      {hasError && <ErrorState onRetry={refetch} />}

      {!isInitialLoad && !hasError && (
        <>
          <Box sx={styles.grid}>
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </Box>

          {lastChecked && <ServiceFooter lastCheckedAt={lastChecked} />}
        </>
      )}
    </Box>
  );
}
