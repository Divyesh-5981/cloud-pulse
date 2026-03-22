import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { memo } from 'react';

const HEIGHT = 2;

const containerSx = {
  height: HEIGHT,
  overflow: 'hidden',
} as const;

const progressSx = {
  height: HEIGHT,
} as const;

interface BackgroundUpdateIndicatorProps {
  active: boolean;
}

export default memo(function BackgroundUpdateIndicator({
  active,
}: BackgroundUpdateIndicatorProps) {
  return (
    <Box sx={containerSx}>{active && <LinearProgress sx={progressSx} />}</Box>
  );
});
