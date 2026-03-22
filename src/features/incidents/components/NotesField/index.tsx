/**
 * NotesField — controlled textarea with debounced auto-save.
 *
 * Owns the auto-save lifecycle via useAutoSave hook.
 * The parent passes a `key` prop (incident ID) so React remounts
 * this component when switching incidents, naturally resetting all state.
 *
 * Displays one of three save states:
 *   - idle:    "✓ Saved"         (green check)
 *   - unsaved: "Unsaved changes" (muted text)
 *   - saving:  "Saving…"         (spinner)
 */
import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { type ChangeEvent, useCallback } from 'react';

import { type SaveStatus, useAutoSave } from '../../hooks/useAutoSave';
import { styles } from './NotesField.styles';

interface NotesFieldProps {
  initialValue: string;
  onSave: (value: string) => Promise<unknown>;
}

function SaveStatusIndicator({ status }: { status: SaveStatus }) {
  switch (status) {
    case 'idle':
      return (
        <Box sx={styles.statusIdle}>
          <CheckIcon sx={styles.checkIcon} />
          Saved
        </Box>
      );
    case 'unsaved':
      return <Box sx={styles.statusUnsaved}>Unsaved changes</Box>;
    case 'saving':
      return (
        <Box sx={styles.statusSaving}>
          <CircularProgress size={12} thickness={5} sx={styles.spinner} />
          Saving…
        </Box>
      );
  }
}

export default function NotesField({ initialValue, onSave }: NotesFieldProps) {
  const { value, saveStatus, handleChange } = useAutoSave({
    initialValue,
    onSave,
  });

  const onChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      handleChange(e.target.value);
    },
    [handleChange],
  );

  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Typography sx={styles.heading}>Notes</Typography>
        <SaveStatusIndicator status={saveStatus} />
      </Box>

      <TextField
        multiline
        minRows={3}
        maxRows={8}
        placeholder="Add notes…"
        value={value}
        onChange={onChange}
        sx={styles.textarea}
        slotProps={{
          input: {
            'aria-label': 'Incident notes',
          },
        }}
      />
    </Box>
  );
}
