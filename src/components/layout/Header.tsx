import CloudIcon from '@mui/icons-material/Cloud';
import RefreshIcon from '@mui/icons-material/Refresh';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { APP_TITLE } from '@/app/tokens';
import { useAuth } from '@/hooks/useAuth';
import { type Role, ROLES } from '@/types';

import { styles } from './Header.styles';

interface HeaderProps {
  autoRefresh: boolean;
  onAutoRefreshToggle: () => void;
  onManualRefresh: () => void;
}

export function Header({
  autoRefresh,
  onAutoRefreshToggle,
  onManualRefresh,
}: HeaderProps) {
  const { role, setRole } = useAuth();

  return (
    <AppBar position="static" elevation={0} sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        <CloudIcon sx={styles.logoIcon} />
        <Typography variant="h6" sx={styles.title}>
          {APP_TITLE}
        </Typography>

        <Box sx={styles.controlsGroup}>
          {/* Role Switcher */}
          <FormControl size="small">
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              aria-label="Select role"
              sx={styles.roleSelect}
            >
              {Object.values(ROLES).map((r) => (
                <MenuItem key={r} value={r}>
                  {r}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Divider orientation="vertical" flexItem sx={styles.divider} />

          {/* Auto-Refresh Toggle */}
          <Box sx={styles.autoRefreshGroup}>
            <Typography sx={styles.autoRefreshLabel}>Auto</Typography>
            <Switch
              checked={autoRefresh}
              onChange={onAutoRefreshToggle}
              size="small"
              slotProps={{ input: { 'aria-label': 'Toggle auto-refresh' } }}
              sx={styles.autoRefreshSwitch}
            />
            <Typography sx={styles.autoRefreshStatus}>
              {autoRefresh ? 'ON' : 'OFF'}
            </Typography>
          </Box>

          {/* Manual Refresh — full button on md+, icon-only on xs/sm */}
          <Button
            variant="outlined"
            size="small"
            startIcon={<RefreshIcon />}
            onClick={onManualRefresh}
            sx={styles.refreshButton}
          >
            Refresh
          </Button>
          <IconButton
            onClick={onManualRefresh}
            aria-label="Refresh data"
            sx={styles.refreshIconOnly}
          >
            <RefreshIcon fontSize="small" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
