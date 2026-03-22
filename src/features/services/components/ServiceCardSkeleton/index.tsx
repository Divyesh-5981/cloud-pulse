import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';

import { styles } from './ServiceCardSkeleton.styles';

export default function ServiceCardSkeleton() {
  return (
    <Card sx={styles.card}>
      <Box sx={styles.header}>
        <Skeleton variant="circular" width={10} height={10} />
        <Skeleton variant="text" width={100} height={24} />
      </Box>
      <Skeleton variant="rounded" width={65} height={24} sx={styles.badge} />
      <Skeleton variant="text" width={110} height={22} />
      <Skeleton variant="text" width={85} height={20} />
    </Card>
  );
}
