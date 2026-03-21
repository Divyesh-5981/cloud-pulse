import Chip from '@mui/material/Chip';

import { type ServiceStatus } from '../../types';
import { chipByStatus } from './StatusBadge.styles';

interface StatusBadgeProps {
  status: ServiceStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return <Chip label={status} size="small" sx={chipByStatus[status]} />;
}
