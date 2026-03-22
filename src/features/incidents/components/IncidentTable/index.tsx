import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { memo, useMemo } from 'react';

import { type ColumnConfig, type Incident } from '../../types';
import { type CellRendererContext, getCellRenderer } from './cellRenderers';
import { styles } from './IncidentTable.styles';

interface IncidentTableProps {
  incidents: Incident[];
  columns: ColumnConfig[];
  onTitleClick?: (incident: Incident) => void;
}

function IncidentTableHeader({ columns }: { columns: ColumnConfig[] }) {
  return (
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
  );
}

function IncidentTableBody({
  incidents,
  columns,
  rendererContext,
}: {
  incidents: Incident[];
  columns: ColumnConfig[];
  rendererContext: CellRendererContext;
}) {
  if (incidents.length === 0) {
    return (
      <TableBody>
        <TableRow sx={styles.emptyRow}>
          <TableCell colSpan={columns.length} sx={styles.emptyCell}>
            No incidents to display.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {incidents.map((incident) => (
        <TableRow key={incident.id} sx={styles.bodyRow}>
          {columns.map((col) => {
            const renderer = getCellRenderer(col.type);
            const value = incident[col.id] as string;

            return (
              <TableCell key={col.id} sx={styles.bodyCell}>
                {renderer(value, incident, rendererContext)}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  );
}

function IncidentTable({
  incidents,
  columns,
  onTitleClick,
}: IncidentTableProps) {
  const rendererContext = useMemo<CellRendererContext>(
    () => ({ onTitleClick }),
    [onTitleClick],
  );

  return (
    <TableContainer sx={styles.tableContainer}>
      <Table sx={styles.table}>
        <IncidentTableHeader columns={columns} />
        <IncidentTableBody
          incidents={incidents}
          columns={columns}
          rendererContext={rendererContext}
        />
      </Table>
    </TableContainer>
  );
}

export default memo(IncidentTable);
