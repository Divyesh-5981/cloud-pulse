import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { memo, useCallback, useMemo, useState } from 'react';

import { type CreateIncidentInput } from '../../hooks/useCreateIncident';
import { SEVERITY } from '../../types';
import { getServiceNames } from '../../utils';
import { styles } from './NewIncidentDialog.styles';

interface NewIncidentDialogProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (input: CreateIncidentInput) => void;
}

const SEVERITY_OPTIONS = Object.values(SEVERITY);

const INITIAL_FORM: CreateIncidentInput = {
  title: '',
  description: '',
  serviceName: '',
  severity: '',
  assignee: '',
};

function NewIncidentDialog({
  open,
  loading,
  onClose,
  onSubmit,
}: NewIncidentDialogProps) {
  const [form, setForm] = useState<CreateIncidentInput>(INITIAL_FORM);

  const serviceNames = useMemo(() => getServiceNames(), []);

  const handleFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const isValid =
    form.title.trim() !== '' &&
    form.serviceName !== '' &&
    form.severity !== '' &&
    form.assignee.trim() !== '';

  const handleSubmit = useCallback(() => {
    if (!isValid) return;
    onSubmit(form);
  }, [form, isValid, onSubmit]);

  const handleExited = useCallback(() => {
    setForm(INITIAL_FORM);
  }, []);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="new-incident-dialog-title"
      slotProps={{ transition: { onExited: handleExited } }}
    >
      <DialogTitle id="new-incident-dialog-title">New Incident</DialogTitle>
      <DialogContent>
        <Box sx={styles.content}>
          <TextField
            name="title"
            label="Title"
            value={form.title}
            onChange={handleFieldChange}
            required
            fullWidth
            autoFocus
            size="small"
            margin="dense"
          />
          <TextField
            name="description"
            label="Description"
            value={form.description}
            onChange={handleFieldChange}
            fullWidth
            multiline
            rows={3}
            size="small"
            margin="dense"
          />
          <TextField
            name="serviceName"
            label="Service"
            value={form.serviceName}
            onChange={handleFieldChange}
            required
            fullWidth
            select
            size="small"
            margin="dense"
          >
            {serviceNames.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="severity"
            label="Severity"
            value={form.severity}
            onChange={handleFieldChange}
            required
            fullWidth
            select
            size="small"
            margin="dense"
          >
            {SEVERITY_OPTIONS.map((sev) => (
              <MenuItem key={sev} value={sev}>
                {sev}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="assignee"
            label="Assignee"
            value={form.assignee}
            onChange={handleFieldChange}
            required
            fullWidth
            size="small"
            margin="dense"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} size="small">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          size="small"
          disabled={!isValid || loading}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default memo(NewIncidentDialog);
