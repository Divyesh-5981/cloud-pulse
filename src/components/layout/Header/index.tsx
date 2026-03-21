import CloudIcon from '@mui/icons-material/Cloud';
import RefreshIcon from '@mui/icons-material/Refresh';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useAuth } from '@/hooks/useAuth';
import { APP_TITLE } from '@/shared/tokens';

import { styles } from './Header.styles';

interface HeaderProps {
  autoRefresh: boolean;
  onAutoRefreshToggle: () => void;
  onManualRefresh: () => void;
}

export default function Header({
  autoRefresh,
  onAutoRefreshToggle,
  onManualRefresh,
}: HeaderProps) {
  const { user, role } = useAuth();

  return (
    <AppBar position="static" elevation={0} sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        <CloudIcon sx={styles.logoIcon} />
        <Typography variant="h6" sx={styles.title}>
          {APP_TITLE}
        </Typography>

        <Box sx={styles.controlsGroup}>
          <Box sx={styles.userInfo}>
            <Avatar sx={styles.avatar}>{user.initials}</Avatar>
            <Box sx={styles.userText}>
              <Typography sx={styles.userName}>{user.name}</Typography>
              <Chip label={role} size="small" sx={styles.roleBadge} />
            </Box>
          </Box>

          <Divider orientation="vertical" flexItem sx={styles.divider} />

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
