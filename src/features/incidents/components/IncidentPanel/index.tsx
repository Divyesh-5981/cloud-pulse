import AddIcon from '@mui/icons-material/Add';
import ReplayIcon from '@mui/icons-material/Replay';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCallback, useMemo, useState } from 'react';

import BackgroundUpdateIndicator from '@/components/feedback/BackgroundUpdateIndicator';
import { useAuth } from '@/hooks/useAuth';

import { INCIDENT_COLUMNS, INCIDENT_PAGINATION } from '../../config';
import { useCreateIncident } from '../../hooks/useCreateIncident';
import { useIncidentActions } from '../../hooks/useIncidentActions';
import { useIncidentFilters } from '../../hooks/useIncidentFilters';
import { useIncidents } from '../../hooks/useIncidents';
import { type Incident } from '../../types';
import { getFiltersWithServiceOptions } from '../../utils';
import EmptyState from '../EmptyState';
import IncidentFilters from '../IncidentFilters';
import IncidentSidePanel from '../IncidentSidePanel';
import IncidentTable from '../IncidentTable';
import IncidentTableSkeleton from '../IncidentTableSkeleton';
import NewIncidentDialog from '../NewIncidentDialog';
import Pagination from '../Pagination';
import { styles } from './IncidentPanel.styles';

export default function IncidentPanel() {
  const { permissions } = useAuth();
  const [page, setPage] = useState(1);
  const resetPage = useCallback(() => setPage(1), []);

  const { filters, hasActiveFilters, setFilter, clearAll } = useIncidentFilters(
    { onPageReset: resetPage },
  );

  const filterConfig = useMemo(() => getFiltersWithServiceOptions(), []);

  const {
    incidents,
    totalCount,
    isInitialLoad,
    isBackgroundFetching,
    error,
    refetch,
  } = useIncidents({ filters, page });

  const { updateStatus } = useIncidentActions();
  const { createIncident, loading: createLoading } = useCreateIncident();

  const hasError = !!error && incidents.length === 0;

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const selectedIncident = useMemo(
    () =>
      selectedId
        ? (incidents.find((inc) => inc.id === selectedId) ?? null)
        : null,
    [incidents, selectedId],
  );

  const handleTitleClick = useCallback((incident: Incident) => {
    setSelectedId(incident.id);
  }, []);

  const handleSidePanelClose = useCallback(() => {
    setSelectedId(null);
  }, []);

  const handleOpenDialog = useCallback(() => setDialogOpen(true), []);
  const handleCloseDialog = useCallback(() => setDialogOpen(false), []);

  const handleCreateIncident = useCallback(
    async (input: Parameters<typeof createIncident>[0]) => {
      const success = await createIncident(input);
      if (success) setDialogOpen(false);
    },
    [createIncident],
  );

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
      <BackgroundUpdateIndicator active={isBackgroundFetching} />

      <Box sx={styles.toolbar}>
        <IncidentFilters
          config={filterConfig}
          filters={filters}
          hasActiveFilters={hasActiveFilters}
          onFilterChange={setFilter}
          onClearAll={clearAll}
        />

        {permissions.canCreateIncident && (
          <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
            sx={styles.newIncidentButton}
          >
            New Incident
          </Button>
        )}
      </Box>

      {incidents.length === 0 ? (
        <EmptyState
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearAll}
        />
      ) : (
        <>
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
        </>
      )}

      <IncidentSidePanel
        incident={selectedIncident}
        open={selectedIncident !== null}
        onClose={handleSidePanelClose}
        onAction={updateStatus}
      />

      {permissions.canCreateIncident && (
        <NewIncidentDialog
          open={dialogOpen}
          loading={createLoading}
          onClose={handleCloseDialog}
          onSubmit={handleCreateIncident}
        />
      )}
    </Box>
  );
}
