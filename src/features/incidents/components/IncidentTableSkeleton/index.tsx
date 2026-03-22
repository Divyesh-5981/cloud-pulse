import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { type ColumnConfig } from '../../types';
import { styles } from './IncidentTableSkeleton.styles';

const SKELETON_WIDTHS: Record<string, number> = {
  text: 80,
  link: 140,
  chip: 90,
  badge: 75,
  statusChip: 95,
  relativeTime: 100,
};

const SKELETON_ROWS = 5;

interface IncidentTableSkeletonProps {
  columns: ColumnConfig[];
}

export default function IncidentTableSkeleton({
  columns,
}: IncidentTableSkeletonProps) {
  return (
    <TableContainer sx={styles.tableContainer}>
      <Table sx={styles.table}>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.id}
                sx={{ ...styles.headerCell, minWidth: col.minWidth }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: SKELETON_ROWS }, (_, rowIdx) => (
            <TableRow key={rowIdx}>
              {columns.map((col) => (
                <TableCell key={col.id} sx={styles.bodyCell}>
                  <Skeleton
                    variant="text"
                    width={SKELETON_WIDTHS[col.type] ?? 80}
                    height={22}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
