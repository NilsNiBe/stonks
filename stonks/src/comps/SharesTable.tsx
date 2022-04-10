import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { SharesTableRow, TheRow } from "./SharesTableRow";

interface SharesTableProps {
  rows: TheRow[];
  deleteRowPurchase: (id: string) => void;
}

export const SharesTable = (props: SharesTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" padding="checkbox">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Aktie</TableCell>
            <TableCell align="right">Menge</TableCell>
            <TableCell align="right">Wert</TableCell>
            <TableCell align="right">Preis</TableCell>
            <TableCell align="right">G/V</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map(row => (
            <SharesTableRow
              key={row.name}
              row={row}
              deleteRowPurchase={props.deleteRowPurchase}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
