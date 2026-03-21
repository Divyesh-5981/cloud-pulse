import Box from '@mui/material/Box';

import { type ServiceStatus } from '../../types';
import { dotColorByStatus, styles } from './StatusDot.styles';

interface StatusDotProps {
  status: ServiceStatus;
}

export default function StatusDot({ status }: StatusDotProps) {
  return <Box sx={{ ...styles.dot, bgcolor: dotColorByStatus[status] }} />;
}
