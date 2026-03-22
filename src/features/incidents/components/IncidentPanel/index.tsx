import ReplayIcon from '@mui/icons-material/Replay';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCallback, useMemo, useState } from 'react';

import { INCIDENT_COLUMNS, INCIDENT_PAGINATION } from '../../config';
import { useIncidentFilters } from '../../hooks/useIncidentFilters';
import { useIncidents } from '../../hooks/useIncidents';
import { type Incident } from '../../types';
import { getFiltersWithServiceOptions } from '../../utils';
import IncidentFilters from '../IncidentFilters';
import IncidentSidePanel from '../IncidentSidePanel';
import IncidentTable from '../IncidentTable';
import IncidentTableSkeleton from '../IncidentTableSkeleton';
import Pagination from '../Pagination';
import { styles } from './IncidentPanel.styles';

export default function IncidentPanel() {
  const [page, setPage] = useState(1);
  const resetPage = useCallback(() => setPage(1), []);

  const { filters, hasActiveFilters, setFilter, clearAll } = useIncidentFilters(
    { onPageReset: resetPage },
  );

  const filterConfig = useMemo(() => getFiltersWithServiceOptions(), []);

  const { incidents, totalCount, isInitialLoad, error, refetch } = useIncidents(
    { filters, page },
  );

  const hasError = !!error && incidents.length === 0;

  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(
    null,
  );

  const handleTitleClick = useCallback((incident: Incident) => {
    setSelectedIncident(incident);
  }, []);

  const handleSidePanelClose = useCallback(() => {
    setSelectedIncident(null);
  }, []);

  if (isInitialLoad) {
    return (
      <Box sx={styles.root}>
        <IncidentTableSkeleton columns={INCIDENT_COLUMNS} />
      </Box>
    );
  }

  if (hasError) {
    return (
      <Box sx={styles.errorContainer}>
        <Typography sx={styles.errorText}>
          Failed to load incidents. Please try again.
        </Typography>
        <Button variant="outlined" startIcon={<ReplayIcon />} onClick={refetch}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={styles.root}>
      <IncidentFilters
        config={filterConfig}
        filters={filters}
        hasActiveFilters={hasActiveFilters}
        onFilterChange={setFilter}
        onClearAll={clearAll}
      />

      <IncidentTable
        incidents={incidents}
        columns={INCIDENT_COLUMNS}
        onTitleClick={handleTitleClick}
      />

      <Pagination
        page={page}
        pageSize={INCIDENT_PAGINATION.pageSize}
        totalCount={totalCount}
        onPageChange={setPage}
      />

      <IncidentSidePanel
        incident={selectedIncident}
        open={selectedIncident !== null}
        onClose={handleSidePanelClose}
      />
    </Box>
  );
}
