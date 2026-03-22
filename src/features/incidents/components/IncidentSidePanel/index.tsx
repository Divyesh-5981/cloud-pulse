import { useMutation } from '@apollo/client/react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ScheduleIcon from '@mui/icons-material/Schedule';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { memo, useCallback } from 'react';

import { UPDATE_INCIDENT_NOTES } from '../../api/queries';
import { type Incident } from '../../types';
import {
  getSeverityColor,
  getStatusColor,
  safeRelativeTime,
} from '../../utils';
import NotesField from '../NotesField';
import {
  severityDotSx,
  severityTextSx,
  statusDotSx,
  styles,
} from './IncidentSidePanel.styles';

interface IncidentSidePanelProps {
  incident: Incident | null;
  open: boolean;
  onClose: () => void;
}

export default memo(function IncidentSidePanel({
  incident,
  open,
  onClose,
}: IncidentSidePanelProps) {
  const [mutate] = useMutation(UPDATE_INCIDENT_NOTES);

  const incidentId = incident?.id ?? '';

  const handleSaveNotes = useCallback(
    (notes: string) => mutate({ variables: { id: incidentId, notes } }),
    [mutate, incidentId],
  );

  if (!incident) return null;

  const sevColor = getSeverityColor(incident.severity);
  const statColor = getStatusColor(incident.status);

  return (
    <Drawer anchor="right" open={open} onClose={onClose} sx={styles.drawer}>
      <Box sx={styles.container}>
        <Box sx={styles.header}>
          <Box sx={styles.headerLeft}>
            <Typography sx={styles.incidentId}>{incident.id}</Typography>
            <Box sx={styles.statusBadge}>
              <Box sx={statusDotSx(statColor)} />
              <Typography sx={styles.statusLabel}>{incident.status}</Typography>
            </Box>
          </Box>

          <IconButton
            onClick={onClose}
            size="small"
            aria-label="Close incident details"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={styles.body}>
          <Typography sx={styles.title}>{incident.title}</Typography>

          <Box sx={styles.detailsGrid}>
            <DetailRow label="Service">
              <Box sx={severityDotSx(sevColor)} />
              <span>{incident.serviceName}</span>
            </DetailRow>

            <DetailRow label="Severity">
              <Box sx={severityDotSx(sevColor)} />
              <Typography component="span" sx={severityTextSx(sevColor)}>
                {incident.severity}
              </Typography>
            </DetailRow>

            <DetailRow label="Assigned to">
              <PersonOutlineIcon sx={styles.detailIcon} />
              <span>{incident.assignee}</span>
            </DetailRow>

            <DetailRow label="Created">
              <AccessTimeIcon sx={styles.detailIcon} />
              <span>{safeRelativeTime(incident.createdAt)}</span>
            </DetailRow>

            <DetailRow label="Updated">
              <ScheduleIcon sx={styles.detailIcon} />
              <span>{safeRelativeTime(incident.updatedAt)}</span>
            </DetailRow>
          </Box>

          <Box>
            <Typography sx={styles.sectionHeading}>Description</Typography>
            <Typography sx={styles.descriptionText}>
              {incident.description || 'No description provided.'}
            </Typography>
          </Box>

          <NotesField
            key={incident.id}
            initialValue={incident.notes}
            onSave={handleSaveNotes}
          />
        </Box>
      </Box>
    </Drawer>
  );
});

interface DetailRowProps {
  label: string;
  children: React.ReactNode;
}

function DetailRow({ label, children }: DetailRowProps) {
  return (
    <Box sx={styles.detailRow}>
      <Typography sx={styles.detailLabel}>{label}:</Typography>
      <Box sx={styles.detailValue}>{children}</Box>
    </Box>
  );
}
